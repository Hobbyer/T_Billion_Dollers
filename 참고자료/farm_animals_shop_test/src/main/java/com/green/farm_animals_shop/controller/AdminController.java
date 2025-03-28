package com.green.farm_animals_shop.controller;

import com.green.farm_animals_shop.dto.EnvironDTO;
import com.green.farm_animals_shop.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;
import java.time.LocalDateTime;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

  private final AdminService adminService;

  // 기온 데이터 추출
  @GetMapping("/temp")
  public List<EnvironDTO> getTemp() {
    return adminService.getTemp();
  }

  // '/get-humidity' 엔드포인트로 GET 요청이 오면 호출되는 메서드 (습도만 반환)
  @GetMapping("/get-humidity")
  public EnvironDTO getHumidity() {
    // Random 객체 생성 - 랜덤한 값을 생성하기 위해 사용
    Random random = new Random();

    // 30에서 90 사이의 랜덤한 습도 값을 생성 (가상 데이터)
    double humidity = 30 + (90 - 30) * random.nextDouble();

    // 기온 값 가져오기: getTemp() 메서드 호출로 기온값 받기
    List<EnvironDTO> tempData = getTemp();  // 기온값 가져오기
    double temp = tempData.isEmpty() ? 25.5 : tempData.get(0).getTemp();  // 기온이 비어있으면 첫 번째 값을 가져옴

    // EnvironDTO 객체 생성 및 데이터 설정
    EnvironDTO environDTO = new EnvironDTO();
    environDTO.setTimeLine(LocalDateTime.now());  // 현재 시간 설정
    environDTO.setTemp(temp);  //
    environDTO.setHumidity(Math.round(humidity * 100.0) / 100.0);  // 랜덤으로 생성된 습도 값

    return environDTO;
  }
}
