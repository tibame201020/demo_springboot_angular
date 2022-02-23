package com.demo.back_end_springboot.back_end_springboot.service.impl;

import com.demo.back_end_springboot.back_end_springboot.domain.Auth;
import com.demo.back_end_springboot.back_end_springboot.domain.User;
import com.demo.back_end_springboot.back_end_springboot.service.MailService;
import com.demo.back_end_springboot.back_end_springboot.util.JwtProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {

    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User sendValidMail(User user) {
        SimpleMailMessage message = getSimpleMailMessage(user);
        message.setSubject("Thanks Register Start Ur Journey");
        //todo
        String valid_token = jwtProvider.getToken(new Auth(user), 7*24*60*1000, "");
        //this is need to generate a link to valid user
        String preStr = "Dear " + user.getAccount() + " :" + "\n";

        preStr = preStr + "plz click the under url to enable ur account" + "\n";

        String base_enable_url = "http://localhost:4200/valid?validToken=";
        message.setText(preStr + base_enable_url + valid_token);
        sendMail(message);
        return user;
    }

    @Override
    public User sendResetPwdMail(User user) {
        SimpleMailMessage message = getSimpleMailMessage(user);
        message.setSubject("Reset Ur Password");
        //todo
        // this is need to generate a link to reset user password
        message.setText("");
        sendMail(message);
        return user;
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
