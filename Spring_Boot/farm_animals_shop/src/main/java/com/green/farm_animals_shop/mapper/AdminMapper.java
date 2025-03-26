package com.green.farm_animals_shop.mapper;

import com.green.farm_animals_shop.dto.EnvironDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface AdminMapper {

  // 기온 데이터 추출
  List<EnvironDTO> getTemp();
}
