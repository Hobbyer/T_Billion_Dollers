package com.green.farm_animals_shop.admin.controller;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.green.farm_animals_shop.admin.dto.ItemDTO;
import com.green.farm_animals_shop.admin.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/items")
public class ItemController {

  private final ItemService itemService;
  private final Cloudinary cloudinary;

  // 상품 등록
  @PostMapping("")
  public ResponseEntity<?> createItem(
      @RequestParam("itemName") String itemName,
      @RequestParam("price") Integer price,
      @RequestParam("stock") Integer stock,
      @RequestParam("seller") String seller,
      @RequestParam("description") String description,
      @RequestParam("cateCode") Integer cateCode,
      @RequestParam("image")MultipartFile imageFile
      ) throws IOException {

    try {
      // Cloudinary에 이미지 업로드 후 URL 반환
      Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.emptyMap());
      String imageUrl = uploadResult.get("url").toString();

      // Cloudinary URL 을 imagePath에 저장
      ItemDTO dto = ItemDTO.builder()
          .itemName(itemName)
          .price(price)
          .stock(stock)
          .seller(seller)
          .description(description)
          .imagePath(imageUrl) // DB에 저장할 경로
          .cateCode(cateCode) // 카테고리 코드
          .build();

      // 3. Service 호출
      itemService.save(dto);

      return ResponseEntity.ok("상품 등록 완료");
    } catch (Exception e) {
      e.printStackTrace();
      return ResponseEntity.status(500).body("상품 등록 실패");
    }
  }

  // 상품 수정
  // 상품 삭제
  // 상품 조회

  // 상품 전체 조회 (오름차순 정렬)
  @GetMapping("")
  public ResponseEntity<?> getAllItemsASC() {
    List<ItemDTO> itemList = itemService.findAllASC();
    return ResponseEntity.ok(itemList);
  }
  // 카테고리별 상품 조회
  // 가격대별 상품 조회
  // 검색어로 상품 조회
}
