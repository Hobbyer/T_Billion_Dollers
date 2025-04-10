package com.green.farm_animals_shop.config;

import com.nimbusds.jose.proc.SecurityContext;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtil {

  private SecurityUtil() {}

  public static String getCurrentMemberId() {

    // 현재 인증 정보를 가져옵니다.
    final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || authentication.getName() == null) {
      throw new RuntimeException("Security Context에 인증 정보가 없습니다.");
    } else {
      return authentication.getName(); // 인증된 사용자의 ID를 반환합니다.
    }
  }
}
