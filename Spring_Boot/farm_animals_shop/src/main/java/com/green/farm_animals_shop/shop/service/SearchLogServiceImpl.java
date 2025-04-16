package com.green.farm_animals_shop.shop.service;

import com.green.farm_animals_shop.shop.entity.SearchLogEntity;
import com.green.farm_animals_shop.shop.repository.SearchLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SearchLogServiceImpl implements SearchLogService{

  private final SearchLogRepository searchLogRepository;

  @Override
  public List<String> getPopularKeywords() {
    return searchLogRepository.findTopPopularKeywords();
  }

  @Override
  public void logSearch(String keyword) {
    SearchLogEntity log = new SearchLogEntity();
    log.setKeyword(keyword);
    log.setCreatedAt(LocalDateTime.now());
    searchLogRepository.save(log);
  }
}
