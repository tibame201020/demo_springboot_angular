package com.demo.back_end_springboot.back_end_springboot.service.impl;

import com.demo.back_end_springboot.back_end_springboot.domain.StockData;
import com.demo.back_end_springboot.back_end_springboot.domain.pratice.PracticeForm;
import com.demo.back_end_springboot.back_end_springboot.domain.pratice.Record;
import com.demo.back_end_springboot.back_end_springboot.domain.pratice.Record.RecordPk;
import com.demo.back_end_springboot.back_end_springboot.domain.pratice.StockVolume;
import com.demo.back_end_springboot.back_end_springboot.repo.RecordRepo;
import com.demo.back_end_springboot.back_end_springboot.repo.StockDataRepo;
import com.demo.back_end_springboot.back_end_springboot.repo.StockRecordRepo;
import com.demo.back_end_springboot.back_end_springboot.service.PracticeService;
import com.demo.back_end_springboot.back_end_springboot.service.TwseStockApi;
import com.demo.back_end_springboot.back_end_springboot.util.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PracticeServiceImpl implements PracticeService {

    @Autowired
    RecordRepo recordRepo;
    @Autowired
    StockRecordRepo stockRecordRepo;

    @Autowired
    TwseStockApi twseStockApi;

    @Autowired
    private StockDataRepo stockDataRepo;

    @Override
    public Map<String, Object> getRecordByAccount(String account) {
        Map<String, Object> rtnMap = new HashMap<>();
        List<Record> records = recordRepo.findByAccountOutlineOrderByRecordPk(account);

        if (records != null && !records.isEmpty()) {
            rtnMap.put("status", true);
            rtnMap.put("recordInfo", records.get(records.size() - 1));
            rtnMap.put("assest", calcTotalAssets(account, records.get(records.size() - 1).getRecordPk().getDate()));
        } else {
            rtnMap.put("status", false);

        }
        return rtnMap;
    }

    @Override
    public Map<String, Object> createRecord(String account) {
        Map<String, Object> rtnMap = new HashMap<>();
        try {
            RecordPk recordPk = new RecordPk();
            recordPk.setAccount(account);
            recordPk.setDate(DateUtil.getToday());
            Record record = new Record();
            record.setRecordPk(recordPk);
            record.setAccountOutline(account);
            record.setCash(new BigDecimal(1000000));
            recordRepo.save(record);
            rtnMap.put("status", true);
            rtnMap.put("recordInfo", recordRepo.findById(recordPk));
            rtnMap.put("assest", calcTotalAssets(account, recordPk.getDate()));
        } catch (Exception e) {
            rtnMap.put("status", false);
        }
        return rtnMap;
    }

    @Override
    public Map<String, Object> buyStock(PracticeForm practiceForm) {
        Map<String, Object> rtnMap = new HashMap<>();
        List<Record> records = recordRepo.findByAccountOutlineOrderByRecordPk(practiceForm.getAccount());
        Record record = records.get(records.size() - 1);

        if (!checkRemainCashCanAfford(record, practiceForm)) {
            rtnMap.put("status", false);
            rtnMap.put("result", "remain-cash not enough");
            return rtnMap;
        }
        if (record.getStockVolumes() == null) {
            record.setStockVolumes(new StockVolume[] {});
        }
        StockVolume[] stockVolumes = record.getStockVolumes();
        stockVolumes = plusStockVolume(stockVolumes, practiceForm);
        record.setStockVolumes(stockVolumes);

        record.getRecordPk().setDate(DateUtil.getToday());

        recordRepo.save(record);
        rtnMap.put("status", true);
        rtnMap.put("result", record);
        rtnMap.put("assest", calcTotalAssets(record.getRecordPk().getAccount(), record.getRecordPk().getDate()));

        return rtnMap;
    }

    private boolean checkRemainCashCanAfford(Record record, PracticeForm practiceForm) {
        BigDecimal remainCash = record.getCash();

        BigDecimal price = new BigDecimal(practiceForm.getPrice());
        BigDecimal volume = new BigDecimal(practiceForm.getVolume());

        int result = remainCash.compareTo(price.multiply(volume));
        if (result != -1) {
            record.setCash(remainCash.subtract(price.multiply(volume)));
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Map<String, Object> sellStock(PracticeForm practiceForm) {
        Map<String, Object> rtnMap = new HashMap<>();
        List<Record> records = recordRepo.findByAccountOutlineOrderByRecordPk(practiceForm.getAccount());
        Record record = records.get(records.size() - 1);

        if (record.getStockVolumes() == null) {
            record.setStockVolumes(new StockVolume[] {});
        }
        StockVolume[] stockVolumes = record.getStockVolumes();

        if (checkStockVolumesHasCode(stockVolumes, practiceForm.getCode())) {
            for (StockVolume stockVolume :stockVolumes) {
                if (stockVolume.getCode().equals(practiceForm.getCode())) {
                    BigDecimal ownerVolume = stockVolume.getVolume();
                    BigDecimal wantToSellVolume = new BigDecimal(practiceForm.getVolume());
                    int compare = ownerVolume.compareTo(wantToSellVolume);
                    if (compare != -1) {
                        stockVolumes = reduceStockVolume(stockVolumes, practiceForm);
                        record.setStockVolumes(stockVolumes);
                        BigDecimal price = new BigDecimal(practiceForm.getPrice());
                        BigDecimal volume = new BigDecimal(practiceForm.getVolume());
                        BigDecimal remainCash = record.getCash();
                        record.setCash(remainCash.add(price.multiply(volume)));

                        record.getRecordPk().setDate(DateUtil.getToday());
                        recordRepo.save(record);
                        rtnMap.put("status", true);
                        rtnMap.put("result", record);
                        rtnMap.put("assest", calcTotalAssets(record.getRecordPk().getAccount(), record.getRecordPk().getDate()));
                        return rtnMap;
                    } else {
                        rtnMap.put("status", false);
                        rtnMap.put("result", "u don't have enough stock volume to sell");
                        return rtnMap;
                    }
                }
            }
        } else {
            rtnMap.put("status", false);
            rtnMap.put("result", "u don't have enough stock volume to sell");
            return rtnMap;
        }
        rtnMap.put("status", false);
        rtnMap.put("result", "u don't have enough stock volume to sell");
        return rtnMap;
    }

    private StockVolume[] plusStockVolume (StockVolume[] stockVolumes, PracticeForm practiceForm) {
        String code = practiceForm.getCode();
        BigDecimal volume = new BigDecimal(practiceForm.getVolume());
        List<StockVolume> stockVolumeList = new ArrayList<>();
        if (stockVolumes.length > 0) {
            for (StockVolume stockVolume:
                 stockVolumes) {
                stockVolumeList.add(stockVolume);
            }
        }
        if (checkStockVolumesHasCode(stockVolumes, code)) {
            for (StockVolume stockVolume : stockVolumeList) {
                if (stockVolume.getCode().equals(code)) {
                    stockVolume.setVolume(stockVolume.getVolume().add(volume));
                }
            }
        } else {
            stockVolumeList.add(new StockVolume(code, volume));
        }
        return stockVolumeList.toArray(new StockVolume[stockVolumeList.size()]);
    }

    private StockVolume[] reduceStockVolume (StockVolume[] stockVolumes, PracticeForm practiceForm) {
        String code = practiceForm.getCode();
        List<StockVolume> stockVolumeList = new ArrayList<>();
        BigDecimal volume = new BigDecimal(practiceForm.getVolume());
        if (stockVolumes.length > 0) {
            stockVolumeList.addAll(Arrays.asList(stockVolumes));
        }
        if (checkStockVolumesHasCode(stockVolumes, code)) {
            for (StockVolume stockVolume : stockVolumeList) {
                if (stockVolume.getCode().equals(code)) {
                    stockVolume.setVolume(stockVolume.getVolume().subtract(volume));
                }
            }
        }

        return stockVolumeList.toArray(new StockVolume[stockVolumeList.size()]);
    }


    private boolean checkStockVolumesHasCode(StockVolume[] stockVolumes, String code) {
        for (StockVolume stockVolume:
             stockVolumes) {
            if (stockVolume.getCode().equals(code)) {
                return true;
            }
        }
        return false;
    }

    private Map<String, BigDecimal> calcTotalAssets(String account, String date) {
        Map<String, BigDecimal> rtnMap = new HashMap<>();


        // the record have remainCash & stockVolumes
        Record record = null;
        List<Record> records = recordRepo.findByAccountOutlineOrderByRecordPk(account);
        for (Record rec : records) {
            Integer recordDate = new Integer(rec.getRecordPk().getDate().replace("/", ""));
            Integer findDate = new Integer(date.replace("/", ""));
            if (findDate >= recordDate) {
                record = rec;
                break;
            }
        }
        rtnMap.put("remainCash", record.getCash());
        StockVolume[] stockVolumes = record.getStockVolumes();
        if (stockVolumes == null || stockVolumes.length == 0) {
            return rtnMap;
        }
        //where date decide what price
        if (DateUtil.getToday().equals(date)) {
            for (StockVolume stockVolume :stockVolumes) {
                BigDecimal price = new BigDecimal(twseStockApi.getPriceByCode(stockVolume.getCode()));
                rtnMap.put(stockVolume.getCode(), price);
            }
        } else {
            String yearMonth = date.substring(0, date.length() - 3);
            Integer findDate = new Integer(date.replace("/", ""));
            for (StockVolume stockVolume :stockVolumes) {
                String yearMonthCode = yearMonth + stockVolume.getCode();
                List<StockData> stockDataList = stockDataRepo.findByYearMonthCodeOrderByYearMonthDateDesc(yearMonthCode);
                for (StockData stockData: stockDataList) {
                    Integer stockDate = new Integer(stockData.getYearMonthDate().replace("/", ""));
                    if (findDate >= stockDate) {
                        rtnMap.put(stockVolume.getCode(), new BigDecimal(stockData.getClosingPrice()));
                        break;
                    }
                }
            }
        }
        return rtnMap;
    }
}
