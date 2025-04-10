package com.green.farm_animals_shop.admin.dto;

import lombok.Data;

@Data
public class SmsVerifyRequestDTO {
  private String phoneNumber; // 전화번호
  private String code; // 인증 코드
}
