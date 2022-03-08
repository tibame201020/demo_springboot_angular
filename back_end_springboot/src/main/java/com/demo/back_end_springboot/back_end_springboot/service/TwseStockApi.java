package com.demo.back_end_springboot.back_end_springboot.service;

import java.util.List;
import java.util.Map;

public interface TwseStockApi {
    List<Map> getCodeNmList(String key);
}
