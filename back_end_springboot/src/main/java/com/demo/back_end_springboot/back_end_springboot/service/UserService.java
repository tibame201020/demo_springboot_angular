package com.demo.back_end_springboot.back_end_springboot.service;

import com.demo.back_end_springboot.back_end_springboot.domain.User;

public interface UserService {

    boolean isValidUser(User user);

    User addUser(User registerUser);

    User updatePwd(User user);

    boolean isAlreadyHaveAccount(String account);

    boolean isAlreadyHaveMail(String mail);

    boolean isAlreadyHavePhone(String phone);
}
