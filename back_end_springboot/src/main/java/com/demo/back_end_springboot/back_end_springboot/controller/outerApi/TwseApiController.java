package com.demo.back_end_springboot.back_end_springboot.controller.outerApi;

import com.demo.back_end_springboot.back_end_springboot.service.TwseStockApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/twse")
@RestController
public class TwseApiController {
    @Autowired
    TwseStockApi twseStockApi;

    @RequestMapping("/quickSearch")
    public List<Map> quickSearch(@RequestBody String key) {
        return twseStockApi.getCodeNmList(key);
    }
}
