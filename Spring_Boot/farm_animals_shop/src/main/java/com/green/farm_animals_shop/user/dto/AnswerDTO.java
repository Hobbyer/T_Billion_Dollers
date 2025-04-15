package com.green.farm_animals_shop.user.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
// 문의 답변
public class AnswerDTO {
  private int answerNum;
  private String content;
  private String writer;
  private LocalDateTime regDate;
  private int questionNum;
}
