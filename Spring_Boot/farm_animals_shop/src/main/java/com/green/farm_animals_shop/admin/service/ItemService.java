package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.ItemDTO;
import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;

import java.util.List;

public interface ItemService {
  // 상품 목록 조회
  List<ItemDTO> findAll();

  // 상품 목록 조회 으름차순
  List<ItemDTO> findAllASC();

  // 상품 상세 조회
  ItemDTO findByCode(Integer itemCode);

  // 상품 목록 조회 (카테고리별)
  List<ItemDTO> findByCategory(Integer cateCode);

  // 상품 목록 조회 (상품명 검색)
  List<ItemDTO> findByName(String itemName);

  // 상품 등록
  ItemDTO save(ItemDTO itemDTO);

  // 상품 수정
  ItemDTO update(Integer itemCode, ItemDTO itemDTO);

  // 상품 삭제
  void delete(Integer itemCode);


  //자동완성 기능
  List<ItemDTO> autoComplete(String keyword);

  // 카테고리별 상품 조회
  List<ItemDTO> findByCategory_CateCode(Integer cateCode);

}
