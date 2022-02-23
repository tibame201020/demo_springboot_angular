package com.demo.back_end_springboot.back_end_springboot.controller.System;

import com.demo.back_end_springboot.back_end_springboot.domain.Auth;
import com.demo.back_end_springboot.back_end_springboot.domain.Jwt;
import com.demo.back_end_springboot.back_end_springboot.domain.User;
import com.demo.back_end_springboot.back_end_springboot.service.MailService;
import com.demo.back_end_springboot.back_end_springboot.service.UserService;
import com.demo.back_end_springboot.back_end_springboot.util.JwtProvider;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


//todo sms一次性登入(spring sms) mail改用thread發

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @Autowired
    private JwtProvider jwtProvider;

    @RequestMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody User registerUser) {
        if (StringUtils.isBlank(registerUser.getAccount()) || StringUtils.isBlank(registerUser.getPwd())) {
            // 若其一為空，不需去db撈data
            registerUser.setMessage("必填資訊不得為空");
            return new ResponseEntity<>(registerUser, HttpStatus.OK);
        }
        User user = userService.addUser(registerUser);
        // 發驗證信 尚未實作
        mailService.sendValidMail(user);


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


    // 有重複帳號回傳true
    @RequestMapping("/register/isAlreadyHaveAccount")
    public ResponseEntity<Boolean> isAlreadyHaveAccount (@RequestBody String account) {
        if (StringUtils.isBlank(account)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(userService.isAlreadyHaveAccount(account), HttpStatus.OK);
    }

    // 有重複mail回傳true
    @RequestMapping("/register/isAlreadyHaveMail")
    public ResponseEntity<Boolean> isAlreadyHaveMail (@RequestBody String mail) {
        if (StringUtils.isBlank(mail)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(userService.isAlreadyHaveMail(mail), HttpStatus.OK);
    }

    // 有重複phone回傳true
    @RequestMapping("/register/isAlreadyHavePhone")
    public ResponseEntity<Boolean> isAlreadyHavePhone (@RequestBody String phone) {
        if (!StringUtils.isNumericSpace(phone)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(userService.isAlreadyHavePhone(phone), HttpStatus.OK);
    }

    @RequestMapping("/refresh_token")
    public void refreshToken (HttpServletRequest request, HttpServletResponse response) throws IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String refresh_token = authorizationHeader.substring("Bearer ".length());
            Jwt jwt = jwtProvider.validToken(refresh_token);
            if (jwt.isExpire()) {
                User user = userService.getUser(jwt.getAccount());
                Auth auth = new Auth(user);
                String access_token = jwtProvider.getToken(auth, 60 * 60 * 1000, request.getRequestURL().toString());
                Map<String, Object> tokens = new HashMap<>();
                tokens.put("access_token", access_token);
                tokens.put("refresh_token", refresh_token);
                tokens.put("user_info", jwt);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), tokens);
            } else {
                response.setHeader("error", jwt.getMessage());
                response.setStatus(HttpStatus.FORBIDDEN.value());
                Map<String, Object> errorMsg = new HashMap<>();
                errorMsg.put("error", jwt);
                response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                new ObjectMapper().writeValue(response.getOutputStream(), errorMsg);
            }
        } else {
            throw new RuntimeException("refresh token is missing");
        }
    }

    @RequestMapping("/enableTheAccount")
    public ResponseEntity<User> enableTheAccount (@RequestBody String token) {
        User user = new User();
        Jwt jwt = jwtProvider.validToken(token);
        if (jwt.isExpire()) {
            user = userService.enableUser(jwt.getAccount());
        } else {
            user.setMessage(jwt.getMessage());
        }
        user.setPwd(null);
        user.setChangePwd(null);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
}
