package com.green.farm_animals_shop.user.service;

import com.green.farm_animals_shop.user.dto.QuestionDTO;

public interface QuestionService {

  //Q&A 게시글 등록 쿼리
  public void insertQuestion(QuestionDTO questionDTO);

}
