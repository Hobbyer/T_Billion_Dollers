package com.green.farm_animals_shop.admin.controller;

import com.green.farm_animals_shop.admin.dto.ItemDTO;
import com.green.farm_animals_shop.admin.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/items")
public class ItemController {

  private final ItemService itemService;

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

    // 1. 서버 로컬 경로에 파일 저장
    String originalFileName = imageFile.getOriginalFilename();
    String savedFileNmae = UUID.randomUUID() + "_" + originalFileName;

    // 절대 경로가 아닌 상대경로 (프로젝트 내부 경로) 사용
    String uploadDir = new File("src/main/resources/static/upload/images/").getAbsolutePath();
    String fullPath = uploadDir + "/" + savedFileNmae;

    imageFile.transferTo(new File(fullPath)); // 서버에 파일 저장

    // 2. DTO로 변환
    ItemDTO dto = ItemDTO.builder()
        .itemName(itemName)
        .price(price)
        .stock(stock)
        .seller(seller)
        .description(description)
        .imagePath("/upload/images/" + savedFileNmae) // DB에 저장할 경로
        .cateCode(cateCode) // 카테고리 코드
        .build();

    // 3. Service 호출
    itemService.save(dto);

    return ResponseEntity.ok("상품 등록 완료");
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
