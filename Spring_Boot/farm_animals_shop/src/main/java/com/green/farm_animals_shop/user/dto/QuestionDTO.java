package com.green.farm_animals_shop.user.dto;

import com.green.farm_animals_shop.admin.dto.AnswerDTO;
import com.green.farm_animals_shop.user.entity.AnswerStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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

  private AnswerStatus answerStatus; // 답변 상태 (열거형으로 설정)

  private List<AnswerDTO> answerList; // 답변 목록
}
