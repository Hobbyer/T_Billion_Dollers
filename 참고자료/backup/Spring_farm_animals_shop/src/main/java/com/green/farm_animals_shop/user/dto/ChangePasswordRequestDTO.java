package com.green.farm_animals_shop.user.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

// 비밀번호를 변경하기 위한 요청 DTO
// 이전의 비밀번호가 제대로 입력되지 않으면 변경되지 않도록 설정
public class ChangePasswordRequestDTO {

  private String userId; // 사용자 ID
  private String oldPassword; // 기존 비밀번호
  private String newPassword; // 새 비밀번호
  private String newPasswordCheck; // 새 비밀번호 확인

}
