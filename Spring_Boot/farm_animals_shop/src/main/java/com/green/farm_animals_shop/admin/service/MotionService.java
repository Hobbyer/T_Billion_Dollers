package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.MotionDTO;
import com.green.farm_animals_shop.admin.repository.MotionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MotionService {
  private final MotionRepository motionRepository;

  public List<MotionDTO> getRecentMotions() {
    // 현재 시각 기준 6시간 전
    LocalDateTime sixHoursAgo = LocalDateTime.now().minusHours(6);
    return motionRepository.findAllAsDTOWithinLast6Hours(sixHoursAgo);
  }
}
