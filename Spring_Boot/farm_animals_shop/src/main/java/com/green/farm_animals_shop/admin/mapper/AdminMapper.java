package com.green.farm_animals_shop.admin.mapper;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {

  // 기온 데이터 추출
  List<EnvironDTO> getTemp();
}
