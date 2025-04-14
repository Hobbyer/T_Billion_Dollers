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
import java.util.List;

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

  @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<CartItemEntity> cartItems; // 장바구니에 담긴 상품들

  @Column(name = "total_price", nullable = false)
  private Integer totalPrice; // 장바구니 총 결제 금액

  @Column(name = "is_checked", nullable = false)
  private Boolean isChecked; // 체크 여부 (장바구니에서 선택된 상품인지 여부)

  @Column(name = "quantity", nullable = false)
  private Integer quantity; // 장바구니에 담긴 상품의 수량

  @Column(name = "added_at", nullable = false)
  private LocalDateTime addedAt; // 장바구니에 추가된 날짜

  @Column(name = "updated_at", nullable = false)
  private LocalDateTime updatedAt; // 장바구니 정보가 업데이트된 날짜
}
