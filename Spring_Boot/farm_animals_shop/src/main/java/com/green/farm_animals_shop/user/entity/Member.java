package com.green.farm_animals_shop.user.entity;

import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity // JPA Entity로 지정
@Data // getter, setter, toString, equals, hashCode 메서드를 자동 생성
@NoArgsConstructor // 기본 생성자

public class Member {

  @Id // 기본 키
  @Column(name = "user_id", nullable = false, unique = true, length = 30) // 사용자 ID 컬럼
  private String userId; // 사용자 ID

  @Column(name = "password", nullable = false, length = 100) // 비밀번호 컬럼
  private String password; // 비밀번호

  @Column(name = "name", nullable = false, length = 10) // 이름 컬럼
  private String name; // 이름

  @Column(name = "email", nullable = false, unique = true, length = 50) // 이메일 컬럼
  private String email; // 이메일

  @Column(name = "phone_number", nullable = false, length = 15) // 전화번호 컬럼
  private String phoneNumber; // 전화번호

  @Column(name = "address", nullable = false, length = 100) // 주소 컬럼
  private String address; // 주소

  @Column(name = "join_date", nullable = false, updatable = false) // 가입일 컬럼
  @Temporal(TemporalType.TIMESTAMP) // 날짜 및 시간 형식
  @CreationTimestamp // 엔티티가 생성될 때 자동으로 현재 시간으로 설정
  private Date joinDate; // 가입일

  @Enumerated(EnumType.STRING) // 열거형 타입을 문자열로 저장
  private Authority authority; // 권한

  @Builder // 빌더 패턴을 사용하여 객체 생성
  public Member(String userId, String password, String name, String email, String phoneNumber, String address, Date joinDate, Authority authority) {
    this.userId = userId;
    this.password = password;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.address = address;
    this.joinDate = joinDate;
    this.authority = authority;
  }
}
