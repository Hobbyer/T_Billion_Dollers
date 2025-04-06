package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.ItemDTO;
import com.green.farm_animals_shop.admin.entity.CategoryInfoEntity;
import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.admin.repository.CategoryInfoRepository;
import com.green.farm_animals_shop.admin.repository.ItemInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

  private final ItemInfoRepository itemInfoRepository;
  private final CategoryInfoRepository categoryInfoRepository;

  @Override
  public List<ItemDTO> findAll() {
    return itemInfoRepository.findAll().stream()
        .map(ItemDTO::fromEntity)
        .toList();
  }

  @Override
  public List<ItemDTO> findAllASC() {
    return itemInfoRepository.findAllASC().stream()
        .map(ItemDTO::fromEntity)
        .toList();
  }

  @Override
  public ItemDTO findByCode(Integer itemCode) {
    ItemInfoEntity entity = itemInfoRepository.findById(itemCode)
        .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
    return ItemDTO.fromEntity(entity);
  }

  @Override
  public List<ItemDTO> findByCategory(Integer cateCode) {
    return List.of();
  }

  @Override
  public List<ItemDTO> findByName(String itemName) {
    return List.of();
  }

  @Override
  public ItemDTO save(ItemDTO itemDTO) {
    // 1. cateCode로 Category Entity 조회.
    CategoryInfoEntity category = categoryInfoRepository.findById(itemDTO.getCateCode())
        .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));

    // 2. DTO -> Entity로 변환.
    ItemInfoEntity item = itemDTO.toEntity(category); // 카테고리 정보 설정

    // 3. 저장
    ItemInfoEntity savedItem = itemInfoRepository.save(item);

    // 4. 저장된 Entity를 DTO로 변환하여 반환
    return ItemDTO.fromEntity(savedItem);
  }

  @Override
  public ItemDTO update(Integer itemCode, ItemDTO itemDTO) {
    ItemInfoEntity item = itemInfoRepository.findById(itemCode)
        .orElseThrow(() -> new RuntimeException("상품을 찾을 수 없습니다."));
    item.setItemName(itemDTO.getItemName());
    item.setPrice(itemDTO.getPrice());
    item.setStock(itemDTO.getStock());
    item.setSeller(itemDTO.getSeller());
    item.setDescription(itemDTO.getDescription());
    item.setImagePath(itemDTO.getImagePath());
    item.setUpdatedAt(LocalDateTime.now());

    // 카테고리 정보는 별도로 설정해야 함
    item.setCategory(categoryInfoRepository.findByCateCode(itemDTO.getCateCode()));

    return ItemDTO.fromEntity(itemInfoRepository.save(item));
  }

  @Override
  public void delete(Integer itemCode) {
    itemInfoRepository.deleteByItemCode(itemCode);
  }
}
