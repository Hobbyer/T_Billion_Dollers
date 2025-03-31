package com.green.farm_animals_shop.user.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class TokenDTO {

  private String grantType; // 권한 부여 방식
  private String accessToken; // 액세스 토큰
  private String refreshToken; // 리프레시 토큰
  private Long accessTokenExpiresIn; // 액세스 토큰 만료 시간

}
