package com.green.farm_animals_shop.user.mapper;

import com.green.farm_animals_shop.user.dto.QuestionDTO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface QuestionMapper {

  //Q&A 게시글 등록 쿼리(첨부파일보류)
  public void insertQuestion(QuestionDTO questionDTO);

}
