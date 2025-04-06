package com.green.farm_animals_shop.admin.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "item_info")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class ItemInfoEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "item_code")
  private Integer itemCode;

  @Column(name = "item_name", nullable = false, length = 100)
  private String itemName;

  @Column(name = "price", nullable = false)
  private Integer price;

  @Column(name = "stock")
  private Integer stock;

  @Column(name = "seller", nullable = false, length = 50)
  String seller;

  @Column(name = "description", columnDefinition = "TEXT")
  private String description;

  @Column(name = "image_path", unique = true, length = 255)
  private String imagePath;

  @CreationTimestamp
  @Column(name = "created_at", updatable = false)
  private LocalDateTime createdAt;

  @UpdateTimestamp
  @Column(name = "updated_at")
  private LocalDateTime updatedAt;

  // 외래키 : category_info(cate_code)
  @ManyToOne
  @JoinColumn(name = "cate_code", nullable = false)
  private CategoryInfoEntity category; // 카테고리 정보
}
