package com.green.farm_animals_shop.shop.controller;

import com.green.farm_animals_shop.shop.dto.CartDTO;
import com.green.farm_animals_shop.shop.service.CartService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("farmdas/cart")
public class CartController {

  private final CartService cartService;

  @GetMapping("/{userId}")
  public CartDTO getCart(@PathVariable("userId") String userId) {
    return cartService.getCartByUserId(userId);
  }

  @PostMapping("/{userId}/add")
  public void addItem(@PathVariable("userId") String userId,
                      @RequestParam Integer itemCode,
                      @RequestParam Integer quantity) {
    cartService.addItemToCart(userId, itemCode, quantity);
  }

  @PutMapping("/{userId}/{cartItemId}/update")
  public void updateCartItem(@PathVariable("userId") String userId,
                             @PathVariable("cartItemId") Long cartItemId,
                             @RequestParam Integer newQuantity) {
    cartService.updateCartItem(userId, cartItemId, newQuantity);
  }

  @DeleteMapping("/{userId}/{cartItemId}/delete")
  public void removeItem(@PathVariable("userId") String userId,
                         @PathVariable("cartItemId") Long cartItemId) {
    cartService.removeItemFromCart(userId, cartItemId);
  }

  @DeleteMapping("/{userId}/clear")
  public void clearCart(@PathVariable("userId") String userId) {
    cartService.clearCart(userId);
  }
}
