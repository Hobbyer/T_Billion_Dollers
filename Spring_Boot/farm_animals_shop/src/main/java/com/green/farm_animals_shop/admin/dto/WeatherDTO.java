package com.green.farm_animals_shop.admin.dto;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class WeatherDTO {
  @JsonProperty("category")
  private String category;  // 기온(TMP), 강수량(PCP) 등

  @JsonProperty("fcst_date")
  private String fcstDate;  // 예보 날짜 (yyyyMMdd)

  @JsonProperty("fcst_time")
  private String fcstTime;  // 예보 시간 (HHmm)

  @JsonProperty("fcst_value")
  private String fcstValue; // 예보 값(온도 등)
}
