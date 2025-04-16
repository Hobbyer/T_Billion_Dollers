package com.green.farm_animals_shop.shop.service;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.admin.repository.ItemInfoRepository;
import com.green.farm_animals_shop.shop.dto.CartDTO;
import com.green.farm_animals_shop.shop.entity.CartEntity;
import com.green.farm_animals_shop.shop.entity.CartItemEntity;
import com.green.farm_animals_shop.shop.mapper.CartMapper;
import com.green.farm_animals_shop.shop.repository.CartItemRepository;
import com.green.farm_animals_shop.shop.repository.CartRepository;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

  private final CartRepository cartRepository;
  private final CartItemRepository cartItemRepository;
  private final ItemInfoRepository itemInfoRepository;
  private final MemberRepository memberRepository;


  @Override
  @Transactional(readOnly = true)
  public CartDTO getCartByUserId(String userId) {
    CartEntity cart = cartRepository.findByUserId(userId);
    if (cart == null) {
      // 장바구니가 없는 경우: 빈 DTO 반환
      return CartDTO.builder()
          .userId(userId)
          .cartItems(List.of()) // 빈 리스트
          .totalPrice(0)
          .isChecked(false)
          .quantity(0)
          .addedAt(LocalDateTime.now())
          .updatedAt(LocalDateTime.now())
          .build();
    }
    return CartMapper.toDTO(cart);
  }

  @Override
  @Transactional
  public boolean addItemToCart(String userId, Integer itemCode, Integer quantity) {
    Member user = memberRepository.findByUserId(userId)
        .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

    ItemInfoEntity item = itemInfoRepository.findById(itemCode)
        .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));

    CartEntity cart = cartRepository.findByUserId(userId);
    if (cart == null) {
      cart = CartEntity.builder()
              .userId(user)
              .cartItems(new ArrayList<>())
              .quantity(quantity)
              .totalPrice(item.getPrice() * quantity)
              .isChecked(true)
              .addedAt(LocalDateTime.now())
              .updatedAt(LocalDateTime.now())
              .build();

      cartRepository.save(cart); // 장바구니가 없으면 새로 생성
    }

    // 장바구니에 이미 존재하는 아이템이라면 false 넘기기
    boolean itemExists = cart.getCartItems().stream()
        .anyMatch(cartItem -> cartItem.getItem().getItemCode().equals(itemCode));

    if (itemExists) {
      return false; // 이미 장바구니에 존재하는 경우
    }

    CartItemEntity newItem = CartItemEntity.builder()
        .cart(cart)
        .item(item)
        .quantity(quantity)
        .totalPrice(item.getPrice() * quantity)
        .isChecked(true)
        .build();

    cartItemRepository.save(newItem); // 장바구니에 상품 추가

    // 장바구니 총 수량 및 가격 업데이트
    cart.setQuantity(cart.getQuantity() + quantity);
    cart.setTotalPrice(cart.getTotalPrice() + newItem.getTotalPrice());
    cart.setUpdatedAt(LocalDateTime.now());

    cartRepository.save(cart);

    return true; // 장바구니에 추가 성공
  }

  @Override
  @Transactional
  public void checkItem(String userId, Long cartItemId, Boolean isChecked) {
    CartItemEntity itemToCheck = cartItemRepository.findById(cartItemId)
        .orElseThrow(() -> new RuntimeException("장바구니에서 아이템을 찾을 수 없습니다."));

    if (!itemToCheck.getCart().getUserId().getUserId().equals(userId)) {
      throw new RuntimeException("사용자 정보가 일치하지 않습니다.");
    }

    itemToCheck.setIsChecked(isChecked);
    cartItemRepository.save(itemToCheck);

    CartEntity cart = itemToCheck.getCart();
    cart.setTotalPrice(cart.getCartItems().stream()
        .filter(CartItemEntity::getIsChecked)
        .mapToInt(CartItemEntity::getQuantity)
        .sum()
    );

    cart.setUpdatedAt(LocalDateTime.now());

    cartRepository.save(cart);
  }

  @Override
  @Transactional
  public void updateCartItem(String userId, Long cartItemId, Integer newQuantity) {
    CartEntity cart = cartRepository.findByUserId(userId);
    if (cart == null) {
      throw new RuntimeException("장바구니가 존재하지 않습니다.");
    }

    CartItemEntity itemToUpdate = cart.getCartItems().stream()
        .filter(item -> item.getCartItemId().equals(cartItemId))
        .findFirst()
        .orElseThrow(() -> new RuntimeException("장바구니에 해당 상품이 존재하지 않습니다."));

    // 기존 총 수량 및 가격에서 제거
    cart.setQuantity(cart.getQuantity() - itemToUpdate.getQuantity());
    cart.setTotalPrice(cart.getTotalPrice() - itemToUpdate.getTotalPrice());

    // 수량 0이면 체크 해제
    if (newQuantity == 0) {
      itemToUpdate.setQuantity(0);
      itemToUpdate.setTotalPrice(0);
      cart.setIsChecked(false);
    } else {
      itemToUpdate.setQuantity(newQuantity);
      itemToUpdate.setTotalPrice(itemToUpdate.getPrice() * newQuantity);

      cart.setTotalPrice(cart.getTotalPrice() + itemToUpdate.getTotalPrice());
      cart.setQuantity(cart.getQuantity() + newQuantity);
    }

    cart.setUpdatedAt(LocalDateTime.now());

    cartRepository.save(cart);
  }

  @Override
  @Transactional
  public void removeItemFromCart(String userId, Long cartItemId) {
    CartEntity cart = cartRepository.findByUserId(userId);
    if(cart == null) {
      throw new RuntimeException("장바구니가 존재하지 않습니다.");
    }

    // 기존 카트 리스트를 유지한 채, 내부에서 항목 제거(removeIf 사용)
    cart.getCartItems().removeIf(item -> item.getCartItemId().equals(cartItemId));

    cart.setTotalPrice(cart.getCartItems().stream().mapToInt(CartItemEntity::getTotalPrice).sum());
    cart.setQuantity(cart.getCartItems().stream().mapToInt(CartItemEntity::getQuantity).sum());
    cart.setUpdatedAt(LocalDateTime.now());

    cartRepository.save(cart);
  }

  @Override
  public void clearCart(String userId) {
    CartEntity cart = cartRepository.findByUserId(userId);
    if (cart != null) {
      cartRepository.delete(cart);
    } 
  }
}
