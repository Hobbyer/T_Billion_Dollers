package com.green.farm_animals_shop.config;

import com.green.farm_animals_shop.jwt.JwtAccessDeniedHandler;
import com.green.farm_animals_shop.jwt.JwtAuthenticationEntryPoint;
import com.green.farm_animals_shop.jwt.JwtFilter;
import com.green.farm_animals_shop.jwt.TokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor
@Configuration
@EnableWebSecurity
@Component

public class WebSecurityConfig implements WebMvcConfigurer {

  private final TokenProvider tokenProvider;
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
  private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

  @Override
  public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
        .allowedOrigins("http://localhost:5173") // 허용할 출처를 설정합니다.
        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // 허용할 HTTP 메서드를 설정합니다.
        .allowCredentials(true); // 자격 증명(쿠키, 인증 헤더 등)을 허용합니다.
//        .maxAge(3600); // Preflight 요청에 대한 캐시 시간(초)을 설정합니다.
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .httpBasic(httpBasic -> httpBasic.disable())
        .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

        .exceptionHandling(exception -> exception
            .authenticationEntryPoint(jwtAuthenticationEntryPoint)
            .accessDeniedHandler(jwtAccessDeniedHandler))

        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/auth/**").permitAll()
//            .anyRequest().permitAll());
            .anyRequest().authenticated());

    // JwtSecurityConfig 대신 JwtFilter를 사용하여 JWT 인증 필터를 추가합니다. (JwtSecurityConfig는 더 이상 사용되지 않음)
    http.addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
