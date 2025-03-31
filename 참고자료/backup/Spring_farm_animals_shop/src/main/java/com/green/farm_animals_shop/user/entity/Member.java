package com.green.farm_animals_shop.user.entity;

import lombok.*;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;

@Entity
@Data
@NoArgsConstructor

public class Member {

  @Id
  @Column(name = "user_id", nullable = false, unique = true, length = 30)
  private String userId; // 사용자 ID

  @Column(name = "password", nullable = false, length = 100)
  private String password; // 비밀번호

  @Column(name = "name", nullable = false, length = 10)
  private String name; // 이름

  @Column(name = "email", nullable = false, unique = true, length = 50)
  private String email; // 이메일

  @Column(name = "phone_number", nullable = false, length = 15)
  private String phoneNumber; // 전화번호

  @Column(name = "address", nullable = false, length = 100)
  private String address; // 주소

  @Column(name = "join_date", nullable = false, updatable = false)
  @Temporal(TemporalType.TIMESTAMP)
  @CreationTimestamp
  private Date joinDate; // 가입일

  @Enumerated(EnumType.STRING)
  private Authority authority; // 권한

  @Builder
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
