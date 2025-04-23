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
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@RequiredArgsConstructor // 생성자 주입을 위한 롬복 어노테이션
@Configuration // 이 클래스가 Spring의 설정 클래스를 나타냄
@EnableWebSecurity // Spring Security를 활성화합니다.
@Component // 이 클래스는 Spring의 컴포넌트 스캔에 의해 자동으로 등록됩니다.

// WebMvcConfigurer를 구현하여 CORS 설정을 추가합니다.
public class WebSecurityConfig implements WebMvcConfigurer {

  private final TokenProvider tokenProvider; // JWT 토큰 제공자
  private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint; // 인증 실패 핸들러
  private final JwtAccessDeniedHandler jwtAccessDeniedHandler; // 접근 거부 핸들러

  @Override
  public void addCorsMappings(CorsRegistry registry) { // CORS 설정 메서드
    registry.addMapping("/**") // 모든 경로에 대해 CORS 설정을 적용합니다.
        .allowedOrigins(
            "http://localhost:5173",        // 개발용 로컬
            "https://farmdas.netlify.app",  // Netlify 배포 도메인
            "http://10.0.2.2:8080", // Android 에뮬레이터에서 localhost 접근 시 사용
            "http://localhost:19006", // React Native Expo 개발용
            "http://192.168.204.19:8080" // 실제 기기 + PC 로컬 IP
        ) // 허용할 출처를 설정합니다.

        .allowedMethods("*") // 모든 HTTP 메서드를 허용합니다.
        .allowCredentials(true); // 자격 증명(쿠키, 인증 헤더 등)을 허용합니다.
//        .maxAge(3600); // Preflight 요청에 대한 캐시 시간(초)을 설정합니다.
  }

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry.addResourceHandler("/upload/**") // "/upload/**" 경로에 대한 리소스 핸들러를 추가합니다.)
        .addResourceLocations("classpath:/static/upload/images/"); // 실제 파일 경로를 설정합니다.
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder(); // 비밀번호 인코더를 설정합니다.
  }

  @Bean
  public WebSecurityCustomizer webSecurityCustomizer() {
    return (web) -> web.ignoring().requestMatchers("/upload/**"); // 특정 경로에 대한 보안을 비활성화합니다.
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .httpBasic(httpBasic -> httpBasic.disable()) // 기본 인증을 비활성화합니다.
        .cors(Customizer.withDefaults()) // CORS 설정을 활성화합니다.
        .csrf(csrf -> csrf.disable()) // CSRF 보호를 비활성화합니다.
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        // 세션 관리를 Stateless로 설정합니다.

        .exceptionHandling(exception -> exception // 예외 처리 설정
            .authenticationEntryPoint(jwtAuthenticationEntryPoint) // 인증 실패 핸들러 설정
            .accessDeniedHandler(jwtAccessDeniedHandler)) // 접근 거부 핸들러 설정

        .authorizeHttpRequests(authorize -> authorize // 요청 권한 설정
            .requestMatchers("/auth/**").permitAll() // 인증 관련 API는 모두 허용합니다.
            .requestMatchers("/upload/**").permitAll() // 업로드 관련 API는 모두 허용합니다.
            .requestMatchers("/farmdas/**").permitAll() // farmdas 관련 API는 모두 허용합니다.
            .requestMatchers("/farmdas/mypage/**").authenticated()
            .anyRequest().authenticated()); // 나머지 요청은 인증을 요구합니다.

    // JwtSecurityConfig 대신 JwtFilter를 사용하여 JWT 인증 필터를 추가합니다. (JwtSecurityConfig는 더 이상 사용되지 않음)
    http.addFilterBefore(new JwtFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
