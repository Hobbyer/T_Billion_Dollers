package com.green.farm_animals_shop.admin.controller;

import com.green.farm_animals_shop.admin.dto.AnswerDTO;
import com.green.farm_animals_shop.admin.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/answers")
public class AnswerController {

  private final AnswerService answerService;

  // 답변 등록
  @PostMapping("/{questionNum}")
  public ResponseEntity<String> insertAnswer(@PathVariable("questionNum") Integer questionNum, @RequestParam("userId") String userId, @RequestBody AnswerDTO answerDTO) {
    answerDTO.setWriter(userId);
    answerDTO.setQuestionNum(questionNum);
    answerService.insertAnswer(answerDTO);
    return ResponseEntity.ok("답변이 등록되었습니다.");
  }

  @GetMapping("/{questionNum}")
  public List<AnswerDTO> getAnswerByQuestion(@PathVariable("questionNum") Integer questionNum) {
    return answerService.getAnswerByQuestionNum(questionNum);
  }
}
