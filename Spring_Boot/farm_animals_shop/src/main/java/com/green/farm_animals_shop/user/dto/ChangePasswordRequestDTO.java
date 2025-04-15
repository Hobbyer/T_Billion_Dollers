package com.green.farm_animals_shop.user.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter // 모든 필드에 대한 getter 메서드를 생성
@Setter // 모든 필드에 대한 setter 메서드를 생성
@ToString // 모든 필드에 대한 toString 메서드를 생성
@NoArgsConstructor // 매개변수가 없는 기본 생성자 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자 생성

// 비밀번호를 변경하기 위한 요청 DTO
// 이전의 비밀번호가 제대로 입력되지 않으면 변경되지 않도록 설정
public class ChangePasswordRequestDTO {

  @NotBlank(message = "사용자 ID는 필수입니다.")
  private String userId; // 사용자 ID

  @NotBlank(message = "현재 비밀번호는 필수입니다.")
  private String oldPassword; // 기존 비밀번호

  @NotBlank(message = "새 비밀번호는 필수입니다.")
  private String newPassword; // 새 비밀번호

  @NotBlank(message = "새 비밀번호 확인은 필수입니다.")
  private String newPasswordCheck; // 새 비밀번호 확인

  // 새 비밀번호와 새 비밀번호 확인이 일치하는지 체크하는 메서드
  public boolean isNewPasswordValid() {
    return newPassword.equals(newPasswordCheck); // 새 비밀번호와 확인 비밀번호가 일치하는지 확인
  }
}
