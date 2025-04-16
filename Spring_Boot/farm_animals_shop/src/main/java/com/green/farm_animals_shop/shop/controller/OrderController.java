package com.green.farm_animals_shop.shop.controller;

import com.green.farm_animals_shop.shop.dto.OrderRequestDTO;
import com.green.farm_animals_shop.shop.entity.OrderEntity;
import com.green.farm_animals_shop.shop.service.OrderService;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
