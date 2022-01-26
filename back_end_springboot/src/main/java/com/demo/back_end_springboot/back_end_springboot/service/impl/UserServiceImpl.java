package com.demo.back_end_springboot.back_end_springboot.service.impl;

import com.demo.back_end_springboot.back_end_springboot.domain.User;
import com.demo.back_end_springboot.back_end_springboot.exception.UserNotFoundException;
import com.demo.back_end_springboot.back_end_springboot.repo.UserRepo;
import com.demo.back_end_springboot.back_end_springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;

    @Override
    public boolean isValidUser(User validUser) {
        boolean isValid = false;
        User user = userRepo.findById(validUser.getAccount()).orElseThrow(() -> new UserNotFoundException("user not found"));
        if (user.getPwd().equals(validUser.getPwd())) {
            isValid = true;
        }

        return isValid;
    }

    @Override
    public User addUser(User registerUser) {
        //若已有同account
        String rtnMsg;
        if (userRepo.findById(registerUser.getAccount()).isPresent()) {
            rtnMsg = String.format("%s已註冊過", registerUser.getAccount());
            registerUser.setMessage(rtnMsg);

            return registerUser;
        } else {
            User user = userRepo.save(registerUser);
            rtnMsg = String.format("%s已註冊成功", user.getAccount());
            user.setMessage(rtnMsg);

            return user;
        }
    }

    @Override
    public User updatePwd(User user) {
        //驗證帳號
        String rtnMsg;
        if (!userRepo.findById(user.getAccount()).isPresent()) {
            rtnMsg = "帳號不存在";
        } else if (!userRepo.findById(user.getAccount()).get().getPwd().equals(user.getPwd())) {
            rtnMsg = "原有密碼不對";
        } else {
            user.setPwd(user.getChangePwd());
            user.setChangePwd("");
            user = userRepo.save(user);
            rtnMsg = String.format("%s帳號已更新密碼，往後請用新密碼登入", user.getAccount());
        }
        user.setMessage(rtnMsg);

        return user;
    }
}
