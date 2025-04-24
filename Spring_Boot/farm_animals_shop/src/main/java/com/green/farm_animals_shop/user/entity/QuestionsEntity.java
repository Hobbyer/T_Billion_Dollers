package com.green.farm_animals_shop.user.entity;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity // 엔티티 클래스
@Table(name = "questions") // 테이블 이름을 "questions"로 설정
@Data // 롬복의 @Data 어노테이션으로 getter, setter, toString 등을 자동 생성
@NoArgsConstructor // 기본 생성자 자동 생성
@AllArgsConstructor // 모든 필드를 매개변수로 받는 생성자 자동 생성
@Builder // 빌더 패턴을 사용하여 객체 생성

public class QuestionsEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "question_num") // 질문 번호 컬럼
  private Integer questionNum; // 질문 번호 (기본 키)

  @Column(name = "title", nullable = false, length = 50) // 제목 컬럼
  private String title; // 질문 제목

  @Column(name = "content", nullable = false, columnDefinition = "TEXT") // 내용 컬럼
  private String content; // 질문 내용

  @Column(name = "reg_date", nullable = false) // 등록일 컬럼
  private LocalDateTime regDate; // 질문 등록일

  @Column(name = "read_cnt", nullable = false) // 작성자 컬럼\
  private Integer readCnt; // 질문 조회수

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "user_id", nullable = false) // 외래 키 설정
  private Member userId; // 질문 작성자 (Member 엔티티와의 연관관계 설정)

  @ManyToOne
  @JoinColumn(name = "item_code", referencedColumnName = "item_code", nullable = false) // 외래 키 설정
  private ItemInfoEntity itemCode; // 질문 상품 코드 (ItemInfoEntity 엔티티와의 연관관계 설정)

  @Enumerated(EnumType.STRING)
  @Column(name = "answer_status", nullable = false) // 답변 상태 컬럼
  private AnswerStatus answerStatus; // 답변 상태 (열거형으로 설정)
}