package com.green.farm_animals_shop.admin.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "category_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CategoryInfoEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "cate_code")
  private Integer cateCode;

  @Column(name = "cate_name", nullable = false, unique = true, length = 15)
  private String cateName;

  // 양방향 연관관계 설정
  @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
  // 즉, 부모 객체에서 자식 객체를 remove() 했을 때, JPA가 해당 자식을 고아(orphan)로 보고 삭제하는 기능.
  private List<ItemInfoEntity> items;


  //추천 여부 컬럼
  @Column(name = "is_recommended")
  private Boolean recommended;


}
