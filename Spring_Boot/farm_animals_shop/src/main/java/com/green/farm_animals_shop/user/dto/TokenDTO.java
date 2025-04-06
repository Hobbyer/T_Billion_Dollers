package com.green.farm_animals_shop.user.dto;

import lombok.*;

@Getter // 모든 필드에 대한 getter 메서드를 생성
@Setter // 모든 필드에 대한 setter 메서드를 생성
@ToString // 모든 필드에 대한 toString 메서드를 생성
@NoArgsConstructor // 매개변수가 없는 기본 생성자 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자 생성
@Builder // 빌더 패턴을 사용하여 객체 생성

public class TokenDTO {

  private String grantType; // 권한 부여 방식
  private String accessToken; // 액세스 토큰
  private Long accessTokenExpiresIn; // 액세스 토큰 만료 시간
  private String refreshToken; // 리프레시 토큰
  private Long refreshTokenExpiresIn; // 리프레시 토큰 만료 시간
}
