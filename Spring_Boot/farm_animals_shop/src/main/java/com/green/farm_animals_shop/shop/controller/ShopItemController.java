package com.green.farm_animals_shop.shop.controller;

import com.green.farm_animals_shop.admin.dto.ItemDTO;
import com.green.farm_animals_shop.admin.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/farmdas/items")
public class ShopItemController {

  private final ItemService itemService;

  @GetMapping("")
  public ResponseEntity<?> getAllItemsASC() {
    List<ItemDTO> itemList = itemService.findAllASC();
    return ResponseEntity.ok(itemList);
  }
}
