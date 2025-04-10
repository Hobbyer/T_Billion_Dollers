package com.green.farm_animals_shop.admin.repository;

import com.green.farm_animals_shop.admin.entity.EnvironmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnvironmentRepository extends JpaRepository<EnvironmentEntity, Integer> {

  @Query(value = "SELECT * FROM environment_data ORDER BY id DESC LIMIT 10", nativeQuery = true)
  List<EnvironmentEntity> findTop10ByTemp(); // 기온 데이터 10개 조회

  @Query(value = "SELECT * FROM environment_data ORDER BY id DESC LIMIT 10", nativeQuery = true)
  List<EnvironmentEntity> findTop10ByHumidity(); // 습도 데이터 10개 조회
}
