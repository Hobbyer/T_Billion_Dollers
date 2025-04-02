package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;
import com.green.farm_animals_shop.admin.repository.EnvironmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EnvironmentService {

  private final EnvironmentRepository environmentRepository;

  public List<EnvironDTO> getTemp() {
    return environmentRepository.findTop10ByTemp()
        .stream()
        .map(entity -> {
          EnvironDTO environDTO = new EnvironDTO();
          environDTO.setTimeLine(entity.getTimeLine());
          return environDTO;
        })
        .collect(Collectors.toList());
  }

  public List<EnvironDTO> getHumidity() {
    return environmentRepository.findTop10ByHumidity()
        .stream()
        .map(entity -> {
          EnvironDTO environDTO = new EnvironDTO();
          environDTO.setTimeLine(entity.getTimeLine());
          return environDTO;
        })
        .collect(Collectors.toList());
  }
}
