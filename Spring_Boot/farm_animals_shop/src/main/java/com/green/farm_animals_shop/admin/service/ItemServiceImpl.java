package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.ItemDTO;
import com.green.farm_animals_shop.admin.entity.CategoryInfoEntity;
import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import com.green.farm_animals_shop.admin.repository.CategoryInfoRepository;
import com.green.farm_animals_shop.admin.repository.ItemInfoRepository;
import com.green.farm_animals_shop.shop.entity.SearchLogEntity;
import com.green.farm_animals_shop.shop.repository.SearchLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ItemServiceImpl implements ItemService{

  private final ItemInfoRepository itemInfoRepository;
  private final CategoryInfoRepository categoryInfoRepository;
  private final SearchLogRepository searchLogRepository;

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

  // 자동완성 기능
  @Override
  public List<ItemDTO> autoComplete(String keyword) {
    return itemInfoRepository.findByItemNameContaining(keyword)
            .stream()
            .map(ItemDTO::fromEntity)
            .collect(Collectors.toList());
  }

  // 카테고리별 상품 조회
  @Override
  public List<ItemDTO> findByCategory_CateCode(Integer cateCode) {
    return itemInfoRepository.findByCategory_CateCode(cateCode)
            .stream()
            .map(ItemDTO::fromEntity)
            .collect(Collectors.toList());
  }

  @Override
  public List<ItemDTO> searchByKeyword(String keyword) {
    SearchLogEntity log = new SearchLogEntity();// 검색기록남기기 위한 객체생성
    log.setKeyword(keyword);// 검색창에 기록한 내용으로 변경
    log.setCreatedAt(LocalDateTime.now());// 검색했을때 시간으로 변경
    searchLogRepository.save(log);//저장된 검색기록을 search log 저장

    List<ItemInfoEntity> result = itemInfoRepository.searchByKeyword(keyword);

    return result.stream()
            .map(ItemDTO::fromEntity)
            .collect(Collectors.toList());
  }


}
