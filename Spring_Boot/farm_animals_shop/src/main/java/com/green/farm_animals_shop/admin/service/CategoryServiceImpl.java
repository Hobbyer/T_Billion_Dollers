package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.CategoryDTO;
import com.green.farm_animals_shop.admin.entity.CategoryInfoEntity;
import com.green.farm_animals_shop.admin.repository.CategoryInfoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

  private final CategoryInfoRepository categoryInfoRepository;

  @Override
  public List<CategoryDTO> findAll() {
    return categoryInfoRepository.findAll().stream()
        .map(CategoryDTO::fromEntity)
        .toList();
  }

  @Override
  public List<CategoryDTO> findAllASC() {
    return categoryInfoRepository.findAllASC().stream()
        .map(CategoryDTO::fromEntity)
        .toList();
  }

  @Override
  public CategoryDTO findByCode(Integer cateCode) {
    CategoryInfoEntity entity= categoryInfoRepository.findById(cateCode)
        .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));
    return CategoryDTO.fromEntity(entity);
  }

  @Override
  public CategoryDTO save(CategoryDTO categoryDTO) {
    CategoryInfoEntity saved = categoryInfoRepository.save(categoryDTO.toEntity());
    return CategoryDTO.fromEntity(saved);
  }

  @Override
  public CategoryDTO update(Integer cateCode, CategoryDTO categoryDTO) {
    CategoryInfoEntity category = categoryInfoRepository.findById(cateCode)
        .orElseThrow(() -> new RuntimeException("카테고리를 찾을 수 없습니다."));
    category.setCateName(categoryDTO.getCateName());
    category.setRecommended(categoryDTO.getRecommended());
    return CategoryDTO.fromEntity(categoryInfoRepository.save(category));
  }

  @Override
  @Transactional // 트랜잭션을 사용하여 데이터베이스 작업을 처리합니다.
  public void delete(Integer cateCode) {
    categoryInfoRepository.deleteByCateCode(cateCode);
  }

  //추천 카테고리
  @Override
  public List<CategoryDTO> getRecommendedCategories() {
    return categoryInfoRepository.findTop6ByRecommendedTrueOrderByCateName()
            .stream()
            .map(CategoryDTO::fromEntity)
            .collect(Collectors.toList());
  }


}
