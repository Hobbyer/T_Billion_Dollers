package com.green.farm_animals_shop.admin.repository;

import com.green.farm_animals_shop.admin.dto.AnswerDTO;
import com.green.farm_animals_shop.admin.entity.AnswerEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<AnswerEntity, Long> {

  // 질문 번호로 답변 조회
  List<AnswerEntity> findByQuestion_QuestionNum(int questionNum); // ✅ 요렇게!!
}
