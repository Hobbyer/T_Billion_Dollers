package com.green.farm_animals_shop.shop.service;

import com.green.farm_animals_shop.shop.dto.OrderRequestDTO;
import com.green.farm_animals_shop.shop.entity.OrderEntity;

public interface OrderService {
  OrderEntity createOrder(OrderRequestDTO dto);
}
