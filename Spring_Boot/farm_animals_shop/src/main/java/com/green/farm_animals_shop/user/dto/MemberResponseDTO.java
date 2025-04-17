package com.green.farm_animals_shop.user.dto;

import com.green.farm_animals_shop.user.entity.Authority;
import com.green.farm_animals_shop.user.entity.Member;
import lombok.*;

@Getter // Getter 어노테이션: 모든 필드에 대한 getter 메서드를 생성
@Setter // Setter 어노테이션: 모든 필드에 대한 setter 메서드를 생성
@ToString // ToString 어노테이션: 모든 필드에 대한 toString 메서드를 생성
@AllArgsConstructor // AllArgsConstructor 어노테이션: 모든 필드를 매개변수로 받는 생성자 생성
@NoArgsConstructor // NoArgsConstructor 어노테이션: 매개변수가 없는 기본 생성자 생성
@Builder // Builder 어노테이션: 빌더 패턴을 사용하여 객체 생성

// Response 를 보낼 때 사용하는 DTO
// DB의 정보를 클라이언트에게 전달
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

  public static MemberResponseDTO fromEntity(Member member) {
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
