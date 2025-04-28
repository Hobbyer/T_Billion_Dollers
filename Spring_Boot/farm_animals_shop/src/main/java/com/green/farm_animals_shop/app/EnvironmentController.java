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
    String flaskUrl = "http://192.168.30.240:5000/sensor/environment";

    try {
      Map<String, Object> sensorData = restTemplate.getForObject(flaskUrl, Map.class);
      return ResponseEntity.ok(sensorData);
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Error fetching data from Flask server: " + e.getMessage());
    }
  }

  @PostMapping("/environment/toggle")
  public ResponseEntity<?> toggleSensor(@RequestBody Map<String, Boolean> body) {
    Boolean state = body.get("state");
    String flaskUrl = "http://192.168.30.240:5000/sensor/toggle";

    try {
      RestTemplate restTemplate = new RestTemplate();
      restTemplate.postForObject(flaskUrl, body, String.class);
      return ResponseEntity.ok("Sensor toggled: " + state);
    } catch (Exception e) {
      return ResponseEntity.status(500).body("Failed to toggle sensor: " + e.getMessage());
    }
  }
}
