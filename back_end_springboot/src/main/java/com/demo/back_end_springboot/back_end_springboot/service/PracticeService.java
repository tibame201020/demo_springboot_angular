package com.demo.back_end_springboot.back_end_springboot.service;

import com.demo.back_end_springboot.back_end_springboot.domain.pratice.HistoryAssetsForm;
import com.demo.back_end_springboot.back_end_springboot.domain.pratice.PracticeForm;

import java.util.Map;

public interface PracticeService {
    Map<String, Object> getRecordByAccount(String account);

    Map<String, Object> createRecord(String account);

    Map<String, Object> buyStock(PracticeForm practiceForm);

    Map<String, Object> sellStock(PracticeForm practiceForm);

    Map<String, Object> getHistoryAssets(HistoryAssetsForm historyAssetsForm);
}
