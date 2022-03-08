package com.demo.back_end_springboot.back_end_springboot.controller.outerApi;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RequestMapping("/api/twse")
@RestController
public class TwseApiController {
    private RestTemplate restTemplate = new RestTemplate();

    @RequestMapping("/quickSearch")
    public String quickSearch(@RequestBody String key) {
//        String url = "https://openapi.twse.com.tw/v1/exchangeReport/STOCK_DAY_ALL";
        String url = "https://mis.twse.com.tw/stock/api/getStockNames.jsp?n=" + key;
        return restTemplate.getForObject(url, String.class);
    }
}
