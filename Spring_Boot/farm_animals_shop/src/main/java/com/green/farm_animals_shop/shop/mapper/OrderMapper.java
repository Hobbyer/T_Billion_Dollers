package com.green.farm_animals_shop.shop.mapper;

import com.green.farm_animals_shop.shop.dto.OrderDTO;
import com.green.farm_animals_shop.shop.dto.OrderItemDTO;
import com.green.farm_animals_shop.shop.entity.OrderEntity;

public class OrderMapper {

  public static OrderDTO toOrderDTO(OrderEntity entity) {
    return OrderDTO.builder()
        .orderId(entity.getOrderId())
        .orderDate(entity.getOrderDate())
        .orderStatus(entity.getOrderStatus())
        .totalPrice(entity.getTotalPrice())
        .orderItems(entity.getOrderItems().stream()
            .map(orderItem -> OrderItemDTO.builder()
                .itemCode(orderItem.getItem().getItemCode())
                .itemName(orderItem.getItem().getItemName())
                .price(orderItem.getPrice())
                .quantity(orderItem.getQuantity())
                .totalPrice(orderItem.getTotalPrice())
                .imagePath(orderItem.getItem().getImagePath())
                .build()
            ).toList())
        .build();
  }
}
