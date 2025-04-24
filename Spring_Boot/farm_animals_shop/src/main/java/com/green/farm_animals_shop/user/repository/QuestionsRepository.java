package com.green.farm_animals_shop.user.repository;

import com.green.farm_animals_shop.user.entity.QuestionsEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionsRepository extends JpaRepository<QuestionsEntity, Integer> {
}
