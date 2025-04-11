package com.green.farm_animals_shop.shop.entity;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.apache.ibatis.annotations.Many;

@Entity
@Data
@Table(name = "cart_item")
@NoArgsConstructor
@AllArgsConstructor
@Builder
// CartItemEntity는 장바구니에 담긴 상품 정보를 나타내는 엔티티입니다.
public class CartItemEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "cart_item_id")
  private Long cartItemId; // 장바구니 상품 ID

  @ManyToOne
  @JoinColumn(name = "cart_id", nullable = false)
  private CartEntity cart; // 장바구니 ID

  @ManyToOne
  @JoinColumn(name = "item_code", nullable = false)
  private ItemInfoEntity item; // 상품 코드 (장바구니에 담긴 상품)

  @Column(name = "quantity", nullable = false)
  private Integer quantity; // 수량 (장바구니에 담긴 상품의 수량)
}
