package com.green.farm_animals_shop.admin.dto;

import com.green.farm_animals_shop.admin.entity.CategoryInfoEntity;
import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ItemDTO {
  private Integer itemCode;
  private String itemName;
  private Integer price;
  private Integer stock;
  private String seller;
  private String description;
  private String imagePath;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;
  private Integer cateCode;

  public static ItemDTO fromEntity(ItemInfoEntity entity) {
    return ItemDTO.builder()
        .itemCode(entity.getItemCode())
        .itemName(entity.getItemName())
        .price(entity.getPrice())
        .stock(entity.getStock())
        .seller(entity.getSeller())
        .description(entity.getDescription())
        .imagePath(entity.getImagePath())
        .createdAt(LocalDateTime.now())
        .updatedAt(LocalDateTime.now())
        .cateCode(entity.getCategory() != null ? entity.getCategory().getCateCode() : null)
        .build();
  }

  public ItemInfoEntity toEntity(CategoryInfoEntity category) {
    return ItemInfoEntity.builder()
        .itemCode(this.itemCode)
        .itemName(this.itemName)
        .price(this.price)
        .stock(this.stock)
        .seller(this.seller)
        .description(this.description)
        .imagePath(this.imagePath)
        .createdAt(this.createdAt)
        .updatedAt(this.updatedAt)
        .category(category) // FK 객체 주입
        .build();
  }
}
