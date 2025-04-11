package com.green.farm_animals_shop.shop.entity;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.user.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "cart")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class CartEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "cart_id")
  private Long cartId; // 장바구니 ID

  @OneToOne
  @JoinColumn(name = "user_id", nullable = false)
  private Member userId; // 사용자 ID

  @ManyToOne
  @JoinColumn(name = "item_code", nullable = false)
  private ItemInfoEntity itemCode; // 상품 코드

  @Column(name = "quantity", nullable = false)
  private Integer quantity; // 수량

  @CreationTimestamp // 생성 시 자동으로 현재 시간 저장 (not null)
  @Column(name = "added_at")
  private LocalDateTime addedAt; // 추가된 시간

  @UpdateTimestamp // 수정 시 자동으로 현재 시간 저장 (not null)
  @Column(name = "updated_at")
  private LocalDateTime updatedAt; // 수정된 시간

  @Column(name = "is_checked", nullable = false)
  private Boolean isChecked; // 체크 여부 (장바구니에서 선택된 상품인지 여부)
}
