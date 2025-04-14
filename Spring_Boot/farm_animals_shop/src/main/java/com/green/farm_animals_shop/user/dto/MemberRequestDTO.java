package com.green.farm_animals_shop.user.dto;

import com.green.farm_animals_shop.user.entity.Authority;
import com.green.farm_animals_shop.user.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter // 모든 필드에 대한 getter 메서드를 생성
@Setter // 모든 필드에 대한 setter 메서드를 생성
@ToString // 모든 필드에 대한 toString 메서드를 생성
@NoArgsConstructor // 매개변수가 없는 기본 생성자 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자 생성
@Builder // 빌더 패턴을 사용하여 객체 생성

// Request 를 받을 때 사용하는 DTO
// 사용자가 수정하고 싶은 정보를 담아서 보내는 역할
public class MemberRequestDTO {

  private String userId; // 사용자 ID
  private String password; // 비밀번호
  private String name; // 이름
  private String email; // 이메일
  private String phoneNumber; // 전화번호
  private String address; // 주소

  // 비밀번호를 암호화하여 Member 엔티티로 변환하는 메서드
  public Member toMember(PasswordEncoder passwordEncoder) {
    return Member.builder()
        .userId(userId)
        .password(passwordEncoder.encode(password))
        .name(name)
        .email(email)
        .phoneNumber(phoneNumber)
        .address(address)
        .authority(Authority.ROLE_USER)
        .build();
  }

  // UsernamePasswordAuthenticationToken 객체로 변환하는 메서드
  public UsernamePasswordAuthenticationToken toAuthentication() {
    return new UsernamePasswordAuthenticationToken(userId, password);
  }
}