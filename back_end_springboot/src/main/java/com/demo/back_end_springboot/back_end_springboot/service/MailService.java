package com.demo.back_end_springboot.back_end_springboot.service;

import com.demo.back_end_springboot.back_end_springboot.domain.User;

public interface MailService {
    public User sendValidMail(User user);
    public User sendResetPwdMail(User user);

    void sendMailForLogin(User user);
}
