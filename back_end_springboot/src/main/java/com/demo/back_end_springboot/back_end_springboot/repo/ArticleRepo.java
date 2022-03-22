package com.demo.back_end_springboot.back_end_springboot.repo;

import com.demo.back_end_springboot.back_end_springboot.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ArticleRepo extends JpaRepository<Article, Integer> {
    List<Article> findByAccount(String account);
}
