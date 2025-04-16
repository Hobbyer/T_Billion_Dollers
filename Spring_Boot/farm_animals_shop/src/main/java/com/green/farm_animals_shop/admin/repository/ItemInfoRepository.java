package com.green.farm_animals_shop.admin.repository;

import com.green.farm_animals_shop.admin.entity.ItemInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ItemInfoRepository extends JpaRepository<ItemInfoEntity, Integer> {
    ItemInfoEntity findByItemCode(Integer itemCode); // 상품 코드로 조회

    ItemInfoEntity findByItemName(String itemName); // 상품 이름으로 조회

    @Query(value = "SELECT * FROM item_info ORDER BY item_code ASC", nativeQuery = true)
    List<ItemInfoEntity> findAllASC(); // 상품 코드 오름차순으로 조회

    void deleteByItemCode(Integer itemCode); // 상품 코드로 삭제

    List<ItemInfoEntity> findByItemNameContaining(String keyword);//자동완성 기능

    List<ItemInfoEntity> findByCategory_CateCode(Integer cateCode);// 카테고리별 상품 조회

}
