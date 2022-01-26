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
    public ResponseEntity<User> registerUser(@RequestBody User registerUser) {
        if (StringUtils.isBlank(registerUser.getAccount()) || StringUtils.isBlank(registerUser.getPwd())) {
            // 若其一為空，不需去db撈data
            registerUser.setMessage("必填資訊不得為空");
            return new ResponseEntity<>(registerUser, HttpStatus.OK);
        }
        User user = userService.addUser(registerUser);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping("/updatePwd")
    public ResponseEntity<User> updatePwd (@RequestBody User user) {
        if (StringUtils.isBlank(user.getAccount()) || StringUtils.isBlank(user.getPwd()) || StringUtils.isBlank(user.getPwd())) {
            user.setMessage("必填資訊不得為空");
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        if (user.getPwd().equals(user.getChangePwd())) {
            user.setMessage("修改密碼不得與原密碼相同");
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        user = userService.updatePwd(user);

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    //todo validMail驗證, sms一次性登入, 圖形驗證
}
