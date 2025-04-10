package com.green.farm_animals_shop.admin.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "environment_data")
public class EnvironmentEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer id;

  private float temp;
  private float humidity;
  private LocalDateTime timeLine;
}
