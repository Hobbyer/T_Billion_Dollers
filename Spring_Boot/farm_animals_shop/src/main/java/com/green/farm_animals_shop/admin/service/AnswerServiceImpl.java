package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.AnswerDTO;
import com.green.farm_animals_shop.admin.entity.AnswerEntity;
import com.green.farm_animals_shop.admin.repository.AnswerRepository;
import com.green.farm_animals_shop.user.entity.AnswerStatus;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.entity.QuestionsEntity;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import com.green.farm_animals_shop.user.repository.QuestionsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor

public class AnswerServiceImpl implements AnswerService {

  private final AnswerRepository answerRepository;
  private final QuestionsRepository questionsRepository;
  private final MemberRepository memberRepository;


  @Override
  public void insertAnswer(AnswerDTO answerDTO) {
    Member writer = memberRepository.findByUserId(answerDTO.getWriter())
            .orElseThrow(() -> new IllegalArgumentException("작성자를 찾을 수 없습니다."));

    QuestionsEntity question = questionsRepository.findById(answerDTO.getQuestionNum())
            .orElseThrow(() -> new IllegalArgumentException("질문을 찾을 수 없습니다."));

    AnswerEntity answer = AnswerEntity.builder()
            .content(answerDTO.getContent())
            .writer(writer)
            .question(question)
            .regDate(LocalDateTime.now())
            .build();

    answerRepository.save(answer);

    // 질문 상태 변경
    question.setAnswerStatus(AnswerStatus.ANSWERED);
    questionsRepository.save(question);
  }

  @Override
  public AnswerDTO getAnswerByQuestionNum(int questionNum) {
    return null;
  }

  @Override
  public void updateAnswer(AnswerDTO answerDTO) {

  }

  @Override
  public void deleteAnswer(Long answerCode) {

  }
}
