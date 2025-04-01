package com.green.farm_animals_shop.jwt;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component // 이 클래스는 Spring의 컴포넌트 스캔에 의해 자동으로 등록됩니다.
public class JwtAccessDeniedHandler implements AccessDeniedHandler {

  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException) throws IOException, ServletException {

    // 필요한 권한이 없는 경우 403 Forbidden 에러를 반환합니다.
    response.sendError(HttpServletResponse.SC_FORBIDDEN);

  }
}
