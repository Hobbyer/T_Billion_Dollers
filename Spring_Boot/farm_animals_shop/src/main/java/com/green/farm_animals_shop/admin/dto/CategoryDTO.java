package com.green.farm_animals_shop.admin.dto;

import com.green.farm_animals_shop.admin.entity.CategoryInfoEntity;
import lombok.Builder;
import lombok.Data;

@Data
public class CategoryDTO {
  private Integer cateCode;
  private String cateName;

  // 카테고리 추천
  private Boolean recommended;
  // 카테고리 내 상품 수
  private Integer itemCount;

  // Entity → DTO 변환
  public static CategoryDTO fromEntity(CategoryInfoEntity entity) {
    CategoryDTO dto = new CategoryDTO();
    dto.setCateCode(entity.getCateCode());
    dto.setCateName(entity.getCateName());
    dto.setRecommended(entity.getRecommended() != null ? entity.getRecommended() : false); // null 허용
    // 아이템 수 계산
    dto.setItemCount(entity.getItems()!=null? entity.getItems().size():0);
    return dto;
  }

  // DTO → Entity 변환 메서드
  public CategoryInfoEntity toEntity() {
    return CategoryInfoEntity.builder()
        .cateCode(this.cateCode)
        .cateName(this.cateName)
        .recommended(this.recommended)
        .build();
  }
}
