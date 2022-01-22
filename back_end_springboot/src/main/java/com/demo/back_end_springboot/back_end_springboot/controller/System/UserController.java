package com.demo.back_end_springboot.back_end_springboot.controller.System;

import com.demo.back_end_springboot.back_end_springboot.domain.User;
import com.demo.back_end_springboot.back_end_springboot.exception.UserNotFoundException;
import com.demo.back_end_springboot.back_end_springboot.service.UserService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @RequestMapping("/loginValid")
    public ResponseEntity<Boolean> loginValid(@RequestBody User user) {
        if (StringUtils.isBlank(user.getAccount()) || StringUtils.isBlank(user.getPwd())) {
            // 若其一為空，不需去db撈data
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
        try {
            boolean validUser = userService.isValidUser(user);
            return new ResponseEntity<>(validUser, HttpStatus.OK);
        } catch (UserNotFoundException userNotFoundException) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
    }

    @RequestMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User registerUser) {
        if (StringUtils.isBlank(registerUser.getAccount()) || StringUtils.isBlank(registerUser.getPwd())) {
            // 若其一為空，不需去db撈data
            return new ResponseEntity<>("必填資訊不得為空", HttpStatus.OK);
        }
        String registerUserMsg = userService.addUser(registerUser);

        return new ResponseEntity<>(registerUserMsg, HttpStatus.OK);
    }

    @RequestMapping("/updatePwd")
    public ResponseEntity<String> updatePwd (@RequestBody User user) {
        if (StringUtils.isBlank(user.getAccount()) || StringUtils.isBlank(user.getPwd()) || StringUtils.isBlank(user.getPwd())) {
            return new ResponseEntity<>("必填資訊不得為空", HttpStatus.OK);
        }
        if (user.getPwd().equals(user.getChangePwd())) {
            return new ResponseEntity<>("修改密碼不得與原密碼相同", HttpStatus.OK);
        }
        String rtnMsg = userService.updatePwd(user);

        return new ResponseEntity<>(rtnMsg, HttpStatus.OK);
    }

    //todo validMail驗證, sms一次性登入, 圖形驗證
}
