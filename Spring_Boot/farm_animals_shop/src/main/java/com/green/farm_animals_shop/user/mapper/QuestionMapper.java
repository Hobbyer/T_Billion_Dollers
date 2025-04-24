package com.green.farm_animals_shop.user.mapper;

import com.green.farm_animals_shop.admin.dto.AnswerDTO;
import com.green.farm_animals_shop.user.dto.QuestionDTO;
import com.green.farm_animals_shop.user.dto.SearchDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface QuestionMapper {

  //Q&A 게시글 목록 리스트 (검색DTO)
  public List<QuestionDTO> getQuestionList(SearchDTO searchDTO);

  //Q&A 게시글 등록 쿼리
  public void insertQuestion(QuestionDTO questionDTO);

  //Q&A 게시글 상세 조회
  public QuestionDTO getQuestion(int questionNum);

  //Q&A 게시글 삭제
  public void deleteQuestion(int questionNum);

  //Q&A 게시글 수정
  public void updateQuestion(QuestionDTO questionDTO);

  //Q&A 조회수 증가
  public void updateReadCnt(int questionNum);


  //-----------답글-------------------------------------

  //답글 목록 조회
  public List<AnswerDTO> getAnswerList(int questionNum);

  //답글 등록
  public void insertAnswer(AnswerDTO answerDTO);

  //답글 삭제
  public void deleteAnswer(int answerNum);

}
