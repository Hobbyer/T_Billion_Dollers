package com.green.farm_animals_shop.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor // 생성자 주입을 자동으로 생성합니다.
public class JwtFilter extends OncePerRequestFilter {

  public static final String AUTHORIZATION_HEADER = "Authorization"; // Authorization 헤더의 이름을 정의합니다.
  public static final String BEARER_PREFIX = "Bearer "; // Bearer 접두사를 정의합니다.
  private final TokenProvider tokenProvider; // TokenProvider를 주입받습니다.

  private String resolveToken(HttpServletRequest request) {
    String bearerToken = request.getHeader(AUTHORIZATION_HEADER); // Authorization 헤더에서 Bearer 토큰을 가져옵니다.
    if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
      return bearerToken.substring(7); // Bearer 접두사를 제거한 토큰을 반환합니다.
    }
    return null; // Bearer 토큰이 없으면 null을 반환합니다.
  }

  @Override
  // 모든 요청에 대해 작동
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

    String requestURI = request.getRequestURI();

    // 정적 리소스 (/upload/)는 필터에서 제외
    if (requestURI.startsWith("/upload/")) {
      filterChain.doFilter(request, response);
      return;
    }

    String jwt = resolveToken(request); // 요청에서 JWT를 추출합니다.

    if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) { // JWT가 존재하고 유효한지 검증합니다.
      Authentication authentication = tokenProvider.getAuthentication(jwt); // JWT로부터 인증 정보를 가져옵니다.
      SecurityContextHolder.getContext().setAuthentication(authentication); // 인증 정보를 SecurityContext에 저장합니다.
    }

    filterChain.doFilter(request, response); // 다음 필터로 요청을 전달합니다.
  }
}
