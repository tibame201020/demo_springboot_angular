package com.demo.back_end_springboot.back_end_springboot.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.demo.back_end_springboot.back_end_springboot.domain.Auth;
import com.demo.back_end_springboot.back_end_springboot.domain.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

public class AuthorFilter extends UsernamePasswordAuthenticationFilter {
    private AuthenticationManager authenticationManager;
    private String secret = "[a-zA-z0-9._]^+$ljdljlwqjmlwdqwdqmslkwqms$";
    public AuthorFilter (AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
       String account = null;
       String pwd = null;

       if (request.getContentType().equals(MediaType.APPLICATION_JSON_VALUE)) {
           try {
               Map<String, String> map = new ObjectMapper().readValue(request.getInputStream(), Map.class);
               account = map.get("account");
               pwd = map.get("pwd");
           } catch (Exception e) {
               e.printStackTrace();
           }
       } else {
           account = request.getParameter("username");
           pwd = request.getParameter("password");
       }

       UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(account, pwd);
       return authenticationManager.authenticate(authenticationToken);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("success");
        //for valid success
        //generate json web token here
        Auth auth = (Auth) authResult.getPrincipal();
        Algorithm algorithm = Algorithm.HMAC512(this.secret.getBytes());

        String access_token = JWT.create()
                .withSubject(auth.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 60 * 60 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("role", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);

        String refresh_token = JWT.create()
                .withSubject(auth.getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + 30 * 1000))
                .withIssuer(request.getRequestURL().toString())
                .withClaim("role", auth.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .sign(algorithm);
        User user = auth.getUser();
        user.setPwd(null);
        user.setChangePwd(null);

        Map<String, Object> tokens = new HashMap<>();
        tokens.put("access_token", access_token);
        tokens.put("refresh_token", refresh_token);
        tokens.put("user_info", user);
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), tokens);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {
        System.out.println("un_success");

        Map<String, String> unSuccessMsg = new HashMap<>();
        unSuccessMsg.put("un_success_msg", "帳號密碼錯誤");
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        new ObjectMapper().writeValue(response.getOutputStream(), unSuccessMsg);
    }
}
