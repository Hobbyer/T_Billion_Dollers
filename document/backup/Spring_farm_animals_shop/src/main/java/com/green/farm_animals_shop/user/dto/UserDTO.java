package com.green.farm_animals_shop.user.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class UserDTO {
  private String userId;
  private String userName;
  private String userPassword;
  private String userAddr;
  private String userEmail;
  private String userTel;
  private LocalDateTime userJoinDate;
}
