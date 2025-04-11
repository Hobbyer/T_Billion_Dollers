package com.green.farm_animals_shop.user.controller;

import com.green.farm_animals_shop.user.dto.QuestionDTO;
import com.green.farm_animals_shop.user.dto.SearchDTO;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import com.green.farm_animals_shop.user.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/questions")
public class QuestionController {
  private final QuestionService questionService;

  //Q&A 게시글 목록 리스트 (+검색, 조회수)
  @GetMapping("")
  public List<QuestionDTO> getList(SearchDTO searchDTO){
    System.out.println("searchDTO = " + searchDTO);
    return questionService.getQuestionList(searchDTO);
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
