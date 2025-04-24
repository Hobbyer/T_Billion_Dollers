package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.AnswerDTO;

public interface AnswerService {

  // 답변 등록
  void insertAnswer(AnswerDTO answerDTO);

  // 답변 조회 (질문 번호로)
  AnswerDTO getAnswerByQuestionNum(int questionNum);

  // 답변 수정
  void updateAnswer(AnswerDTO answerDTO);

  // 답변 삭제
  void deleteAnswer(Long answerCode);

}
