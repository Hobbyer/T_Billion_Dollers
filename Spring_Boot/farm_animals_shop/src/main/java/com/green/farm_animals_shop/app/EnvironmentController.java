package com.green.farm_animals_shop.app;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import retrofit2.Response;

import java.util.Map;

@RestController
@RequestMapping("/sensor")
public class EnvironmentController {

  private final RestTemplate restTemplate = new RestTemplate();

  @GetMapping("/environment")
  public ResponseEntity<?> getEnvironmentData() {
    String flaskUrl = "http://192.168.30.240:5000/sensor/environment"; // Flask 서버 IP

    try {
      Map<String, Object> sensorData = restTemplate.getForObject(flaskUrl, Map.class); // Flask 서버에서 데이터 가져오기
      return ResponseEntity.ok(sensorData); // 가져온 데이터를 그대로 반환
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error fetching data from Flask server: " + e.getMessage()); // 에러 처리
    }
  }

  @PostMapping("/environment/toggle")
  public ResponseEntity<?> toggleSensor(@RequestBody Map<String, Boolean> body) {
    String flaskUrl = "http://192.168.30.240:5000/sensor/toggle"; // Flask 서버 IP

    try {
      RestTemplate restTemplate = new RestTemplate(); // RestTemplate 객체 생성
      restTemplate.postForObject(flaskUrl, body, String.class); // 받은 데이터를 그대로 Flask로 넘김
      return ResponseEntity.ok("Sensor toggle request sent successfully."); // 성공 메시지 반환
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Failed to toggle sensor: " + e.getMessage()); // 에러 처리
    }
  }
}
