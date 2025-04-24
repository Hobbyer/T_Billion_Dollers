package com.green.farm_animals_shop.admin.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
// 문의 답변
public class AnswerDTO {
  private Long answerCode;
  private String content;
  private String writer;
  private LocalDateTime regDate;
  private Integer questionNum;
}
