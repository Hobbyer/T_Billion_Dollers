package com.green.farm_animals_shop.admin.controller;

import com.green.farm_animals_shop.admin.dto.CategoryDTO;
import com.green.farm_animals_shop.admin.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/categories")
public class CategoryController {

  private final CategoryService categoryService;

  // 카테고리 생성
  @PostMapping("")
  public ResponseEntity<?> createCategory(@RequestBody CategoryDTO categoryDTO) {
    return ResponseEntity.ok(categoryService.save(categoryDTO));
  }

  // 카테고리 수정
  @PutMapping("/update")
  public ResponseEntity<?> updateCategory(@RequestBody CategoryDTO categoryDTO) {
    return ResponseEntity.ok(categoryService.update(categoryDTO.getCateCode(), categoryDTO));
  }

  // 카테고리 삭제
  @PostMapping("/delete")
  public ResponseEntity<?> deleteCategory(@RequestBody CategoryDTO categoryDTO) {
    Integer cateCode = categoryDTO.getCateCode();
    categoryService.delete(cateCode);
    return ResponseEntity.ok("카테고리 삭제 완료");
  }

  // 카테고리 조회
  @GetMapping("/{cateCode}")
  public ResponseEntity<?> getCategory(@PathVariable Integer cateCode) {
    return ResponseEntity.ok(categoryService.findByCode(cateCode));
  }

  // 카테고리 전체 조회 (오름차순 정렬)
  @GetMapping("")
  public ResponseEntity<?> getAllCategories() {
    return ResponseEntity.ok(categoryService.findAllASC());
  }

}
