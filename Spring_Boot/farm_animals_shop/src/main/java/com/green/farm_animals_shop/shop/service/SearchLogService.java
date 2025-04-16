package com.green.farm_animals_shop.shop.service;

import java.util.List;

public interface SearchLogService {
  List<String> getPopularKeywords(); // 인기 검색어 top10 조회
  void logSearch(String keyword);// 검색어 기록
}
