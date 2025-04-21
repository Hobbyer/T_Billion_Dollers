package com.green.farm_animals_shop.user.dto;

import lombok.Data;

@Data
public class SearchDTO {
  private String searchKeyword;
  private String searchValue;
  private int page = 1;         // 현재 페이지 (기본 1)
  private int size = 10;        // 페이지 당 개수
  private String userId;

  public int getOffset() {
    return (Math.max(page, 1) - 1) * size;
  }
}
