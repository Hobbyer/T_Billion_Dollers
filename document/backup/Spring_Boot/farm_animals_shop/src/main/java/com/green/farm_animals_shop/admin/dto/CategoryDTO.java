package com.green.farm_animals_shop.admin.dto;

import com.green.farm_animals_shop.admin.entity.CategoryInfoEntity;
import lombok.Builder;
import lombok.Data;

@Data
public class CategoryDTO {
  private Integer cateCode;
  private String cateName;

  // Entity → DTO 변환
  public static CategoryDTO fromEntity(CategoryInfoEntity entity) {
    CategoryDTO dto = new CategoryDTO();
    dto.setCateCode(entity.getCateCode());
    dto.setCateName(entity.getCateName());
    return dto;
  }

  // DTO → Entity 변환 메서드
  public CategoryInfoEntity toEntity() {
    return CategoryInfoEntity.builder()
        .cateCode(this.cateCode)
        .cateName(this.cateName)
        .build();
  }
}
