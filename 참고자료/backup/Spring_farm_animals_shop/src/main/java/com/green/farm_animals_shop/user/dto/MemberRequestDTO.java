package com.green.farm_animals_shop.user.dto;

import com.green.farm_animals_shop.user.entity.Authority;
import com.green.farm_animals_shop.user.entity.Member;
import lombok.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder

// Request 를 받을 때 사용하는 DTO
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