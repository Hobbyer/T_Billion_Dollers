package com.green.farm_animals_shop.admin.entity;

import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.entity.QuestionsEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity // JPA 엔티티로 지정
@Table(name = "answer_data") // 테이블 이름을 "answer_data"로 설정
@Data // 롬복의 @Data 어노테이션으로 getter, setter, toString 등을 자동 생성
@NoArgsConstructor // 기본 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자 자동 생성
@Builder // 빌더 패턴을 사용하여 객체 생성

public class AnswerEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY) // 기본 키 자동 생성 전략
  @Column(name = "answer_code") // 테이블의 컬럼 이름을 "answer_code"로 설정
  private Long answerCode; // 답변 코드 (기본 키)

  @Column(name = "content", nullable = false, columnDefinition = "TEXT") // 테이블의 컬럼 이름을 "content"로 설정, null 허용 안 함
  private String content; // 답변 내용

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "writer", referencedColumnName = "user_id", nullable = false) // 테이블의 컬럼 이름을 "writer"로 설정, null 허용 안 함
  private Member writer; // 답변 작성자

  @Column(name = "reg_date", nullable = false) // 테이블의 컬럼 이름을 "reg_date"로 설정, null 허용 안 함)
  private LocalDateTime regDate; // 답변 등록일

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "question_num", referencedColumnName = "question_num", nullable = false) // 외래 키 설정
  private QuestionsEntity question; // 질문 번호 (QuestionsEntity 엔티티와의 연관관계 설정)
}
