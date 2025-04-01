package com.green.farm_animals_shop.user.service;

import com.green.farm_animals_shop.user.dto.QuestionDTO;
import com.green.farm_animals_shop.user.mapper.QuestionMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class QuestionServiceImpl implements QuestionService {
  private final QuestionMapper questionMapper;

  //  //Q&A 게시글 목록 리스트
  @Override
  public List<QuestionDTO> getQuestionList() {
    return questionMapper.getQuestionList();
  }

  //Q&A 게시글 등록
  @Override
  public void insertQuestion(QuestionDTO questionDTO) {
     questionMapper.insertQuestion(questionDTO);
  }


  //Q&A 게시글 상세 조회
  @Override
  public QuestionDTO getQuestion(int questionNum) {
    //조회수 증가 쿼리 실행
    questionMapper.updateReadCnt(questionNum);
    //상세 정보 조회 쿼리
    return questionMapper.getQuestion(questionNum);
  }

  //Q&A 게시글 삭제
  @Override
  public void deleteQuestion(int questionNum) {
    questionMapper.deleteQuestion(questionNum);
  }

  //Q&A 게시글 수정
  @Override
  public void updateQuestion(QuestionDTO questionDTO) {
    questionMapper.updateQuestion(questionDTO);
  }

}
