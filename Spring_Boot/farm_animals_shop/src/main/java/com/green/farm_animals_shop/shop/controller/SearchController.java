package com.green.farm_animals_shop.shop.controller;

import com.green.farm_animals_shop.shop.service.SearchLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/farmdas/search")
public class SearchController {
  private final SearchLogService searchLogService;

  // 인기 검색어 10개 조회
  @GetMapping("/popular")
  public ResponseEntity<?> getPopularKeywords(){
    return ResponseEntity.ok(searchLogService.getPopularKeywords());
  }

  // 검색 기록 저장
  @PostMapping("/log")
  public ResponseEntity<?> logSearch(@RequestBody String keyword){
    searchLogService.logSearch(keyword); // 입력된 검색어를 검색 기록 db에 저장
    return ResponseEntity.ok().build();
  }


}
