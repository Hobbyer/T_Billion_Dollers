package com.green.farm_animals_shop.user.controller;

import com.green.farm_animals_shop.user.dto.QuestionDTO;
import com.green.farm_animals_shop.user.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/questions")
public class QuestionController {
  private final QuestionService questionService;

  @GetMapping("")
  //Q&A 게시글 목록 리스트
  public List<QuestionDTO> getList(QuestionDTO questionDTO){
    return questionService.getQuestionList();
  }

  //Q&A 게시글 상세 조회
  @GetMapping("/{questionNum}")
  public QuestionDTO getQuestion(@PathVariable ("questionNum") int questionNum){
    return questionService.getQuestion(questionNum);
  }

  //Q&A 게시글 등록
  @PostMapping("")
  public void regQuestion(@RequestBody QuestionDTO questionDTO){
    questionService.insertQuestion(questionDTO);
  }

  //Q&A 게시글 삭제
  @DeleteMapping("/{questionNum}")
  public void deleteQuestion(@PathVariable("questionNum") int questionNum){
    questionService.deleteQuestion(questionNum);
  }

  //Q&A 게시글 수정
  @PutMapping("/{questionNum}")
  public void updateQuestion(@PathVariable("questionNum") int questionNum, @RequestBody QuestionDTO questionDTO){
    questionDTO.setQuestionNum(questionNum);
    questionService.updateQuestion(questionDTO);
  }

}
