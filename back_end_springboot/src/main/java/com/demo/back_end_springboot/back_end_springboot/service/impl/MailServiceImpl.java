package com.demo.back_end_springboot.back_end_springboot.service.impl;

import com.demo.back_end_springboot.back_end_springboot.domain.User;
import com.demo.back_end_springboot.back_end_springboot.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public User sendValidMail(User user) {
        SimpleMailMessage message = getSimpleMailMessage(user);
        message.setSubject("Thanks Register Start Ur Journey");
        //todo
        // this is need to generate a link to valid user
        message.setText("");
        sendMail(message);
        return null;
    }

    @Override
    public User sendResetPwdMail(User user) {
        SimpleMailMessage message = getSimpleMailMessage(user);
        message.setSubject("Reset Ur Password");
        //todo
        // this is need to generate a link to reset user password
        message.setText("");
        sendMail(message);
        return null;
    }


    private SimpleMailMessage getSimpleMailMessage(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getMail());
        return message;
    }

    private void sendMail(SimpleMailMessage message) {
        message.setFrom("localjokerfool@hotmail.com");
        mailSender.send(message);
    }
}
