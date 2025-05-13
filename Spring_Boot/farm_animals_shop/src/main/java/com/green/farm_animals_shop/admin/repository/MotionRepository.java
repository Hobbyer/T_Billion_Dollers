package com.green.farm_animals_shop.admin.repository;

import com.green.farm_animals_shop.admin.dto.MotionDTO;
import com.green.farm_animals_shop.admin.entity.MotionEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface MotionRepository extends JpaRepository<MotionEntity, Integer> {

  // 6시간 이내 데이터만 DTO 로 조회
  @Query("""
    SELECT new com.green.farm_animals_shop.admin.dto.MotionDTO(
      m.motionCode,
      m.motion,
      m.timeLine
    )
    FROM MotionEntity m
    WHERE m.timeLine >= :threshold
    ORDER BY m.motionCode DESC
    """)
  List<MotionDTO> findAllAsDTOWithinLast6Hours(@Param("threshold") LocalDateTime threshold);

}
