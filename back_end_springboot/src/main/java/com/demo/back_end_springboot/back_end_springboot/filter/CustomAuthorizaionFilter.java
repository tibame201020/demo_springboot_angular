package com.demo.back_end_springboot.back_end_springboot.filter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import static com.demo.back_end_springboot.back_end_springboot.constant.SecurityConstant.*;

import static java.util.Arrays.stream;

public class CustomAuthorizaionFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        if (request.getServletPath().equals("/login") || request.getServletPath().equals("/api/user/refresh_token/**")) {
            filterChain.doFilter(request, response);
        } else {
          String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
          if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
              try {
                  String token = authorizationHeader.substring("Bearer ".length());
                  Algorithm algorithm = Algorithm.HMAC512(SECRET.getBytes());
                  JWTVerifier verifier = JWT.require(algorithm).build();
                  DecodedJWT decodedJWT = verifier.verify(token);
                  String account = decodedJWT.getSubject();
                  String[] roles = decodedJWT.getClaim("role").asArray(String.class);
                  Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
                  stream(roles).forEach(role -> {
                      authorities.add(new SimpleGrantedAuthority(role));
                  });
                  UsernamePasswordAuthenticationToken authenticationToken =
                          new UsernamePasswordAuthenticationToken(account, null, authorities);
                  SecurityContextHolder.getContext().setAuthentication(authenticationToken);

                  filterChain.doFilter(request, response);
              } catch (Exception e) {
                  response.setHeader("error", e.getMessage());
                  response.setStatus(HttpStatus.FORBIDDEN.value());
                  Map<String, String> errorMsg = new HashMap<>();
                  errorMsg.put("error", e.getMessage());
                  response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                  new ObjectMapper().writeValue(response.getOutputStream(), errorMsg);
              }
          } else {
              filterChain.doFilter(request, response);
          }

        }
    }
}
