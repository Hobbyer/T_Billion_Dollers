package com.green.farm_animals_shop.shop.controller;

import com.green.farm_animals_shop.shop.dto.DailyOrderSummaryDTO;
import com.green.farm_animals_shop.shop.dto.OrderDTO;
import com.green.farm_animals_shop.shop.dto.OrderItemDTO;
import com.green.farm_animals_shop.shop.dto.OrderRequestDTO;
import com.green.farm_animals_shop.shop.entity.OrderEntity;
import com.green.farm_animals_shop.shop.service.OrderService;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/orders")

public class OrderController {

  private final OrderService orderService;
  private final MemberRepository memberRepository;

  @PostMapping("")
  public ResponseEntity<?> createOrder(@RequestBody OrderRequestDTO dto) {

    OrderEntity order = orderService.createOrder(dto);

    return ResponseEntity.ok(order);
  }

  @GetMapping("/{userId}")
  public ResponseEntity<?> getOrdersByUserId(@PathVariable("userId") String userId) {
    List<OrderDTO> orders = orderService.getOrdersByUserId(userId);
    return ResponseEntity.ok(orders);
  }

  @GetMapping("")
  public ResponseEntity<?> getAllOrders() {
    List<OrderDTO> orders = orderService.getAllOrders();
    return ResponseEntity.ok(orders);
  }

  @GetMapping("/itemList/{orderId}")
  public ResponseEntity<?> getOrderItemsByOrderId(@PathVariable("orderId") Long orderId) {
    List<OrderItemDTO> orderItems = orderService.getOrderItemsByOrderId(orderId);
    return ResponseEntity.ok(orderItems);
  }
}
