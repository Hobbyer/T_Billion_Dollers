package com.green.farm_animals_shop.admin.controller;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;
import com.green.farm_animals_shop.admin.service.AdminService;
import com.green.farm_animals_shop.admin.service.EnvironmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

  private final AdminService adminService;
  private final EnvironmentService environmentService;

  // 기온 데이터 추출
  @GetMapping("/temp")
  public List<EnvironDTO> getTemp() {
    return environmentService.getTemp();
  }

  @GetMapping("/humidity")
  public List<EnvironDTO> getHumidity() {
    return environmentService.getHumidity();
  }

  // 기상청 단기예보 API 호출
  @GetMapping("/weather")
  public String getWeather(
          @RequestParam(name = "baseDate") String baseDate,
          @RequestParam(name = "baseTime") String baseTime,
          @RequestParam(name = "nx") int nx,
          @RequestParam(name = "ny") int ny
  ) {
    return environmentService.getWeather(baseDate, baseTime, nx, ny);
  }

}
