package com.demo.back_end_springboot.back_end_springboot.service;

import com.demo.back_end_springboot.back_end_springboot.domain.User;

public interface MailService {
    public User sendValidMail(User user);
}
