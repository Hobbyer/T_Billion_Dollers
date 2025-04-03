package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;
import com.green.farm_animals_shop.admin.repository.EnvironmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class EnvironmentService {
  private final EnvironmentRepository environmentRepository;

  @Value("${weather.api.key}")  // application.properties에서 가져옴
  private String apiKey;

  private static final String BASE_URL = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst";


  public List<EnvironDTO> getTemp() {
    return environmentRepository.findTop10ByTemp()
            .stream()
            .map(entity -> {
              EnvironDTO environDTO = new EnvironDTO();
              environDTO.setTimeLine(entity.getTimeLine());
              environDTO.setTemp(entity.getTemp()); // temp 설정
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
              environDTO.setHumidity(entity.getHumidity());
              return environDTO;
            })
            .collect(Collectors.toList());
  }

  public String getWeather(String baseDate, String baseTime, int nx, int ny) {
    RestTemplate restTemplate = new RestTemplate();

    String encodedApiKey = URLEncoder.encode(apiKey, StandardCharsets.UTF_8);
    // API 요청 URL 생성
    String url = BASE_URL +
            "?serviceKey=" + encodedApiKey +
            "&numOfRows=10&pageNo=1&dataType=JSON" +
            "&base_date=" + baseDate +
            "&base_time=" + baseTime +
            "&nx=" + nx +
            "&ny=" + ny;

    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    return response.getBody(); // JSON 데이터 반환
  }
}
