package com.green.farm_animals_shop.admin.dto;

import com.green.farm_animals_shop.admin.entity.AnswerEntity;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.entity.QuestionsEntity;
import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

// 문의 답변
public class AnswerDTO {
  private Long answerCode;
  private String content;
  private String writer;
  private LocalDateTime regDate;
  private Integer questionNum;

  // AnswerEntity -> AnswerDTO 로 변환
  public static AnswerDTO fromEntity(AnswerEntity entity) {
    return AnswerDTO.builder()
            .answerCode(entity.getAnswerCode())
            .content(entity.getContent())
            .writer(entity.getWriter().getUserId())
            .regDate(entity.getRegDate())
            .questionNum(entity.getQuestion().getQuestionNum())
            .build();
  }

  // AnswerDTO -> AnswerEntity 로 변환
  public AnswerEntity toEntity(QuestionsEntity question, Member writer) {
    return AnswerEntity.builder()
            .content(this.content)
            .question(question)
            .writer(writer)
            .regDate(LocalDateTime.now())
            .build();
  }
}
