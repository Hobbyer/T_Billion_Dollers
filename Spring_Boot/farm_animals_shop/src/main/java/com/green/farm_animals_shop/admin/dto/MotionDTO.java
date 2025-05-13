package com.green.farm_animals_shop.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class MotionDTO {
  private Integer motionCode;
  private LocalDateTime timeLine;
  private String motion;

  public MotionDTO(Integer motionCode, String motion, LocalDateTime timeLine) {
    this.motionCode = motionCode;
    this.motion = motion;
    this.timeLine = timeLine;
  }
}
