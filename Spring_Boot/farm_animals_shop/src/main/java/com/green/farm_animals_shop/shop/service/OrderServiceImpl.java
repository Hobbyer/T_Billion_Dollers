package com.green.farm_animals_shop.shop.service;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.admin.repository.ItemInfoRepository;
import com.green.farm_animals_shop.shop.dto.OrderRequestDTO;
import com.green.farm_animals_shop.shop.entity.OrderEntity;
import com.green.farm_animals_shop.shop.entity.OrderItemEntity;
import com.green.farm_animals_shop.shop.entity.OrderItemStatus;
import com.green.farm_animals_shop.shop.entity.OrderStatus;
import com.green.farm_animals_shop.shop.repository.OrderItemRepository;
import com.green.farm_animals_shop.shop.repository.OrderRepository;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor

public class OrderServiceImpl implements OrderService {

  private final MemberRepository memberRepository;
  private final ItemInfoRepository itemInfoRepository;
  private final OrderRepository orderRepository;
  private final OrderItemRepository orderItemRepository;

  @Override
  public OrderEntity createOrder(OrderRequestDTO dto) {

    // 사용자 조회
    Member user = memberRepository.findByUserId(dto.getUserId())
        .orElseThrow(() -> new RuntimeException("회원을 찾을 수 없습니다."));

    // 주문 생성
    OrderEntity order = OrderEntity.builder()
        .user(user)
        .totalPrice(dto.getTotalPrice())
        .orderStatus(OrderStatus.CREATED)
        .orderDate(LocalDateTime.now())
        .build();

    // 주문 상품 생성 및 연동
    List<OrderItemEntity> orderItems = dto.getOrderItems().stream()
        .map(itemDTO -> {
          ItemInfoEntity item = itemInfoRepository.findById(itemDTO.getItemCode())
              .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
          return OrderItemEntity.builder()
              .order(order)
              .item(item)
              .quantity(itemDTO.getQuantity())
              .price(itemDTO.getPrice())
              .totalPrice(itemDTO.getTotalPrice())
              .orderItemStatus(OrderItemStatus.PENDING)
              .build();
        }).toList();

    order.setOrderItems(orderItems); // order <-> orderItems 연결

    return orderRepository.save(order); // cascade로 orderItems도 저장됨
  }
}
