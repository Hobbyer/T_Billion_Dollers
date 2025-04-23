package com.green.farm_animals_shop.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
public class QuestionDTO {
  private int questionNum;
  private String title;
  private String content;
  private LocalDateTime regDate;
  private int readCnt;

  private String userId;
  private Integer itemCode;

  private String itemName;  // DB의 ITEM_NAME과 매핑
  private String imagePath;  // DB의 IMAGE_PATH와 매핑

  private String answerStatus;
}
