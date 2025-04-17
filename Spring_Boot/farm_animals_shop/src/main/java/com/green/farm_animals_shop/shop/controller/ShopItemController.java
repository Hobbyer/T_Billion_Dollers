package com.green.farm_animals_shop.shop.controller;

import com.green.farm_animals_shop.admin.dto.ItemDTO;
import com.green.farm_animals_shop.admin.service.CategoryService;
import com.green.farm_animals_shop.admin.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/farmdas/items")
public class ShopItemController {

  private final ItemService itemService;
  private final CategoryService categoryService;

  @GetMapping("")
  public ResponseEntity<?> getAllItemsASC() {
    List<ItemDTO> itemList = itemService.findAllASC();
    return ResponseEntity.ok(itemList);
  }

  @GetMapping("/{itemCode}")
  public ResponseEntity<?> getItemByCode(@PathVariable("itemCode") Integer itemCode) {
    ItemDTO item = itemService.findByCode(itemCode);
    return ResponseEntity.ok(item);
  }

  // 자동완성 기능
  @GetMapping("/autocomplete")
  public ResponseEntity<?> autoComplete(@RequestParam("keyword") String keyword){
    return ResponseEntity.ok(itemService.autoComplete(keyword));
  }

  // 카테고리 별 조회기능
  @GetMapping("/category/{cateCode}")
  public ResponseEntity<?> getItemByCategory(@PathVariable("cateCode") Integer cateCode){
    return ResponseEntity.ok(itemService.findByCategory_CateCode(cateCode));
  }

  // 카테고리 추천
  @GetMapping("/categories/recommended")
  public ResponseEntity<?> getRecommendedCategories(){
    return ResponseEntity.ok(categoryService.getRecommendedCategories());
  }



}
