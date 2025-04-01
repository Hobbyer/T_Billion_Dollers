package com.green.farm_animals_shop.config;

import com.green.farm_animals_shop.jwt.JwtFilter;
import com.green.farm_animals_shop.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@RequiredArgsConstructor // 생성자 주입을 자동으로 생성합니다.

// SecurityConfigurerAdapter를 상속받아 JWT 보안 설정을 위한 클래스입니다.
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {

  private final TokenProvider tokenProvider; // TokenProvider를 주입받습니다.

  @Override
  public void configure(HttpSecurity http) { // HttpSecurity를 설정합니다.
    JwtFilter customFilter = new JwtFilter(tokenProvider); // JwtFilter를 생성합니다.

    // UsernamePasswordAuthenticationFilter 앞에 JwtFilter를 추가합니다.
    http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
  }
}
