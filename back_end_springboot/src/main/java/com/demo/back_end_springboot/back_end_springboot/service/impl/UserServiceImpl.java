package com.demo.back_end_springboot.back_end_springboot.service.impl;

import com.demo.back_end_springboot.back_end_springboot.domain.Role;
import com.demo.back_end_springboot.back_end_springboot.domain.User;
import com.demo.back_end_springboot.back_end_springboot.exception.UserNotFoundException;
import com.demo.back_end_springboot.back_end_springboot.repo.RoleRepo;
import com.demo.back_end_springboot.back_end_springboot.repo.UserRepo;
import com.demo.back_end_springboot.back_end_springboot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepo userRepo;
    @Autowired
    private RoleRepo roleRepo;

    private BCryptPasswordEncoder passwordEncoder;

    public UserServiceImpl() {
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

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
            List<Role> roles = new ArrayList<>();
            for (int i = 1; i <= 3; i++) {
                roles.add(roleRepo.findById(i).get());
            }
            registerUser.setRoles(roles);
            registerUser.setValid(true);
            registerUser.setPwd(passwordEncoder.encode(registerUser.getPwd()));

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

    @Override
    public boolean isAlreadyHaveAccount(String account) {
        Optional<User> optional = userRepo.findById(account);
        if (optional.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean isAlreadyHaveMail(String mail) {
        Optional<User> optional = userRepo.findFirstByMail(mail);
        if (optional.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public boolean isAlreadyHavePhone(String phone) {
        Optional<User> optional = userRepo.findFirstByPhone(phone);
        if (optional.isPresent()) {
            return true;
        } else {
            return false;
        }
    }

    @Override
    public List<User> getAll() {
        return userRepo.findAll();
    }

    @Override
    public void addRole(Role role) {
        roleRepo.save(role);
    }

    @Override
    public User getUser(String account) {
        Optional<User> optional = userRepo.findById(account);
        return optional.get();
    }
}
