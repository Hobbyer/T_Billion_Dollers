package com.green.farm_animals_shop.shop.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name="search_log")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
// 인기 검색어 추출을 위한 엔티티
public class SearchLogEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id; // 각 검색 기록을 고유하게 식별하기 위한 기본키

  //사용자 검색한 검색어
  private String keyword;

  //검색된 시간(검색어가 기록된 시간) > 필요할까나
  private LocalDateTime createdAt;

  @PrePersist // 엔티티 객체가 데이터 베이스 저장전 호출됨
  public void prePersist(){
    if(this.createdAt == null){ // null경우에만 현재 시간 저장
      this.createdAt = LocalDateTime.now();
    }
  }
}
