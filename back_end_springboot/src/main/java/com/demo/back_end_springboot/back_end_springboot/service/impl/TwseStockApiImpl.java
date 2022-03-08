package com.demo.back_end_springboot.back_end_springboot.service.impl;

import com.demo.back_end_springboot.back_end_springboot.service.TwseStockApi;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TwseStockApiImpl implements TwseStockApi {

    private static List<Map> codeNmList;
    private static final RestTemplate restTemplate = new RestTemplate();;

    static {
        String url = "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL";
        codeNmList = new ArrayList<>(restTemplate.getForObject(url, List.class));
    }

    @Override
    public List<Map> getCodeNmList(String key) {
        return this.codeNmList.stream().filter(map -> map.get("Code").toString().startsWith(key) || map.get("Name").toString().contains(key))
                .collect(Collectors.toList());
    }



}
