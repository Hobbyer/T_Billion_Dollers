package com.green.farm_animals_shop.admin.repository;

import com.green.farm_animals_shop.admin.entity.CategoryInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryInfoRepository extends JpaRepository<CategoryInfoEntity, Integer> {

    @Query(value = "SELECT * FROM category_info ORDER BY cate_code ASC", nativeQuery = true)
    List<CategoryInfoEntity> findAllASC(); // 카테고리 목록 조회 (오름차순)

    CategoryInfoEntity findByCateCode(Integer cateCode); // 카테고리 코드로 조회

    CategoryInfoEntity findByCateName(String cateName); // 카테고리 이름으로 조회

    void deleteByCateCode(Integer cateCode); // 카테고리 코드로 삭제
}
