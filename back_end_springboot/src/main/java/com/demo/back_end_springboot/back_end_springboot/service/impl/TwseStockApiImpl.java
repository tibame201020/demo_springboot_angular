package com.demo.back_end_springboot.back_end_springboot.service.impl;

import com.demo.back_end_springboot.back_end_springboot.domain.CodeParam;
import com.demo.back_end_springboot.back_end_springboot.domain.StockBasicInfo;
import com.demo.back_end_springboot.back_end_springboot.domain.StockData;
import com.demo.back_end_springboot.back_end_springboot.domain.StockData.StockDataPk;
import com.demo.back_end_springboot.back_end_springboot.domain.StockJson;
import com.demo.back_end_springboot.back_end_springboot.repo.StockDataRepo;
import com.demo.back_end_springboot.back_end_springboot.service.TwseStockApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class TwseStockApiImpl implements TwseStockApi {


    private static final RestTemplate REST_TEMPLATE;
    static {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(15000);
        factory.setReadTimeout(5000);
        REST_TEMPLATE = new RestTemplate(factory);
    }
    private static final String INFO_URL = "https://www.twse.com.tw/en/exchangeReport/STOCK_DAY?response=json&date=%s&stockNo=%s";
    private static final String STOCK_DAY_ALL_URL = "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL";
    private static final StockJson[] ALL_STOCKS_TODAY_INFO = REST_TEMPLATE.getForObject(STOCK_DAY_ALL_URL, StockJson[].class);
    private static final String YAHOO_FINANCE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/%s.TW?period1=%s&period2=%s&interval=1d&events=history&=hP2rOschxO0";

    @Autowired
    private StockDataRepo stockDataRepo;

    @Override
    public StockJson[] getCodeNmList(String key) {
        assert ALL_STOCKS_TODAY_INFO != null;
        return Arrays.stream(ALL_STOCKS_TODAY_INFO).filter(stockJson -> stockJson.getCode().contains(key) || stockJson.getName().contains(key)).toArray(StockJson[]::new);
    }

    @Override
    public Map<String,Object> getBasicInfo(CodeParam codeParam) {
        Map<String,Object> rtnMap = new HashMap<>();
        boolean status;
        Object result;
        if (!checkStockCodeNm(codeParam.getCode())) {
            result = "stock code is un-correct";
            status = false;
        } else {
            checkLastestData(codeParam);
            List<StockData> stockDataList = getStockList(codeParam);

            status = true;
            result = stockDataList;
        }
        rtnMap.put("result",result);
        rtnMap.put("status", status);

        return rtnMap;
    }
//    @Override
//    public Map<String,Object> getBasicInfo(CodeParam codeParam) {
//        Map<String,Object> rtnMap = new HashMap<>();
//        String url = String.format(YAHOO_FINANCE_URL, codeParam.getCode(), codeParam.getEndDateMilli(), codeParam.getBeginDateMilli());
//        String str = REST_TEMPLATE.getForEntity(url, String.class).getBody();
//        return rtnMap;
//    }

    private List<StockData> getStockList(CodeParam codeParam) {
        List<StockData> stockDataList = new ArrayList<>();
        LocalDate start = codeParam.getEndLocalDate();
        LocalDate end = codeParam.getBeginLocalDate();
        String code = codeParam.getCode();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy/MM");
        for (LocalDate date = start; date.isBefore(end); date = date.plusMonths(1)) {
            String yearMonthCode = date.format(formatter) + code;
            List<StockData> stockDataListByMonth = stockDataRepo.findByYearMonthCode(yearMonthCode);
            if (null == stockDataListByMonth || stockDataListByMonth.size() == 0) {
                codeParam.setBeginLocalDate(date);
                getLastestDataFromUrl(codeParam);
                stockDataListByMonth = stockDataRepo.findByYearMonthCode(yearMonthCode);
            }
            stockDataList.addAll(stockDataListByMonth);
        }
        return stockDataList;
    }

    private void checkLastestData(CodeParam codeParam) {
        StockDataPk stockDataPk = new StockDataPk();
        stockDataPk.setCode(codeParam.getCode());
        if (LocalDate.now().equals(codeParam.getBeginLocalDate())) {
            if (LocalDateTime.now().getHour() < 16) {
                codeParam.setBeginLocalDate(LocalDate.now().minus(1, ChronoUnit.DAYS));
            }
        }
        stockDataPk.setDate(codeParam.getBeginDate());
        Optional<StockData> optionalStockData = stockDataRepo.findById(stockDataPk);
        if (!optionalStockData.isPresent()) {
            getLastestDataFromUrl(codeParam);
        }
    }

    private void getLastestDataFromUrl(CodeParam codeParam) {
        StockBasicInfo stockBasicInfo = getStockInfoFromTWSE(codeParam);
        List<StockData> stockDataList = translateJsonData(stockBasicInfo.getData(), codeParam.getCode());
        for (StockData stockData : stockDataList) {
            stockDataRepo.save(stockData);
        }
    }

    private List<StockData> translateJsonData(String[][] data, String code) {
        List<StockData> stockDataList = new ArrayList<>();
        for (String[] dataInfo : data) {
            StockData stockData = translateStockData(dataInfo, code);
            stockDataList.add(stockData);
        }
        return stockDataList;
    }

    private StockData translateStockData(String[] dataInfo, String code) {
        StockDataPk stockDataPk = new StockDataPk();
        stockDataPk.setDate(dataInfo[0]);
        stockDataPk.setCode(code);
        StockData stockData = new StockData();
        stockData.setStockDataPk(stockDataPk);
        stockData.setTradeVolume(dataInfo[1]);
        stockData.setTradeValue(dataInfo[2]);
        stockData.setOpeningPrice(dataInfo[3]);
        stockData.setHighestPrice(dataInfo[4]);
        stockData.setLowestPrice(dataInfo[5]);
        stockData.setClosingPrice(dataInfo[6]);
        stockData.setChange(dataInfo[7]);
        stockData.setTransaction(dataInfo[8]);
        stockData.setYearMonthCode(dataInfo[0].substring(0, 7) + code);
        return stockData;
    }

    private StockBasicInfo getStockInfoFromTWSE(CodeParam codeParam) {
        String url = getInfoUrl(codeParam.getBeginDate().replace("/", ""), codeParam.getCode());
        return REST_TEMPLATE.getForObject(url, StockBasicInfo.class);
    }

    private boolean checkStockCodeNm(String key) {
        if (key.contains("-")) {
            key = key.split("-")[0].trim();
        }
        assert ALL_STOCKS_TODAY_INFO != null;
        for (StockJson stockJson : ALL_STOCKS_TODAY_INFO) {
            if (stockJson.getCode().equals(key)) {
                return true;
            }
        }
        return false;
    }

    private String getInfoUrl(String date, String code) {
        return String.format(INFO_URL, date, code);
    }
}
