package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;

import java.util.List;

public interface AdminService {
  // 기온 데이터 추출
  List<EnvironDTO> getTemp();
}
