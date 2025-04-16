package com.green.farm_animals_shop.shop.repository;

import com.green.farm_animals_shop.shop.entity.SearchLogEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

// 인기 검색어 조회
public interface SearchLogRepository extends JpaRepository<SearchLogEntity, Long> {
  @Query(value = "SELECT S.KEYWORD FROM search_log S GROUP BY S.KEYWORD ORDER BY COUNT(S.KEYWORD) DESC LIMIT 10",nativeQuery = true)
  List<String> findTopPopularKeywords();
}
