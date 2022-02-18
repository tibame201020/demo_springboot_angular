package com.demo.back_end_springboot.back_end_springboot;

import com.demo.back_end_springboot.back_end_springboot.domain.Role;
import com.demo.back_end_springboot.back_end_springboot.service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackEndSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackEndSpringbootApplication.class, args);
	}

	// @Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			userService.addRole(new Role(null, "Lvl1"));
			userService.addRole(new Role(null, "Lvl2"));
		};
	}
}
