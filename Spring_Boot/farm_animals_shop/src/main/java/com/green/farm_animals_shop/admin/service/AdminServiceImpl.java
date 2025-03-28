package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;
import com.green.farm_animals_shop.admin.mapper.AdminMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

  private final AdminMapper adminMapper;

  @Override
  public List<EnvironDTO> getTemp() {
    return adminMapper.getTemp();
  }
}
