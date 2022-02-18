package com.demo.back_end_springboot.back_end_springboot.config;

import com.demo.back_end_springboot.back_end_springboot.filter.AuthorFilter;
import com.demo.back_end_springboot.back_end_springboot.filter.CustomAuthorizaionFilter;
import com.demo.back_end_springboot.back_end_springboot.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static com.demo.back_end_springboot.back_end_springboot.constant.SecurityConstant.*;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthService authService;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        AuthorFilter authorFilter = new AuthorFilter(authenticationManagerBean());
        authorFilter.setFilterProcessesUrl(LOGIN_URL);

       http.csrf().disable();
       http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
       http.authorizeRequests().antMatchers(LOGIN_URL, REFRESH_TOKEN_URL, REGISTER_URL)
               .permitAll();

       http.authorizeRequests().anyRequest().authenticated();
       http.addFilter(authorFilter);
       http.addFilterBefore(new CustomAuthorizaionFilter(), UsernamePasswordAuthenticationFilter.class);

    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(authService)
                .passwordEncoder(new BCryptPasswordEncoder());
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


}
