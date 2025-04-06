package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.CategoryDTO;

import java.util.List;

public interface CategoryService {
  List<CategoryDTO> findAll();
  List<CategoryDTO> findAllASC();
  CategoryDTO findByCode(Integer cateCode);
  CategoryDTO save(CategoryDTO categoryDTO);
  CategoryDTO update(Integer cateCode, CategoryDTO categoryDTO);
  void delete(Integer cateCode);
}
