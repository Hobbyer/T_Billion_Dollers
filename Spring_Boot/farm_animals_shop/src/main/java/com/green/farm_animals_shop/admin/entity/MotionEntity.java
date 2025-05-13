package com.green.farm_animals_shop.admin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "motion_data")

public class MotionEntity {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer motionCode;
  @Column(name = "motion")
  private String motion;
  @Column(name = "time_line")
  private LocalDateTime timeLine;

}
