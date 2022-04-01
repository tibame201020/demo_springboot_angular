package com.demo.back_end_springboot.back_end_springboot.controller.pratice;

import com.demo.back_end_springboot.back_end_springboot.domain.pratice.PracticeForm;
import com.demo.back_end_springboot.back_end_springboot.service.PracticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("api/practice")
public class PracticeController {

    @Autowired
    PracticeService practiceService;

    @RequestMapping("/getSelfRecord")
    public Map<String, Object> getSelfRecord(@RequestBody String account) {
        return practiceService.getRecordByAccount(account);
    }

    @RequestMapping("/createSelfRecord")
    public Map<String, Object> createSelfRecord(@RequestBody String account) {
        return practiceService.createRecord(account);
    }

    @RequestMapping("/buy")
    public Map<String, Object> buy(@RequestBody PracticeForm practiceForm) {
        practiceForm.setBehavior("buy");
        return practiceService.buyStock(practiceForm);
    }

    @RequestMapping("/sell")
    public Map<String, Object> sell(@RequestBody PracticeForm practiceForm) {
        practiceForm.setBehavior("sell");
        return practiceService.sellStock(practiceForm);
    }


}
