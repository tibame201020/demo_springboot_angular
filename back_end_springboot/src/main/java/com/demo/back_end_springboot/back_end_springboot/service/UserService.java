package com.demo.back_end_springboot.back_end_springboot.service;

import com.demo.back_end_springboot.back_end_springboot.domain.User;

public interface UserService {
    boolean isValidUser(User user);

    String addUser(User registerUser);

    String updatePwd(User user);
}
