package com.green.farm_animals_shop.user.dto;

import com.green.farm_animals_shop.user.entity.Authority;
import com.green.farm_animals_shop.user.entity.Member;
import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder

// Response 를 보낼 때 사용하는 DTO
public class MemberResponseDTO {
  private String userId; // 사용자 ID
  private String name; // 이름
  private String email; // 이메일
  private String phoneNumber; // 전화번호
  private String address; // 주소
  private Authority authority; // 권한

  public static MemberResponseDTO of(Member member) {
    return MemberResponseDTO.builder()
        .userId(member.getUserId())
        .name(member.getName())
        .email(member.getEmail())
        .phoneNumber(member.getPhoneNumber())
        .address(member.getAddress())
        .authority(member.getAuthority())
        .build();
  }
}
