package com.green.farm_animals_shop.user.service;

import com.green.farm_animals_shop.user.dto.QuestionDTO;
import com.green.farm_animals_shop.user.dto.SearchDTO;

import java.util.List;

public interface QuestionService {

  //Q&A 게시글 목록 리스트 (검색DTO)
  public List<QuestionDTO> getQuestionList(SearchDTO searchDTO);

  //Q&A 게시글 등록 쿼리
  public void insertQuestion(QuestionDTO questionDTO);

  //Q&A 게시글 상세 조회
  QuestionDTO getQuestion(int questionNum);

  //Q&A 게시글 삭제
  public void deleteQuestion(int questionNum);

  //Q&A 게시글 수정
  public void updateQuestion(QuestionDTO questionDTO);

}
