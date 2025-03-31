package com.green.farm_animals_shop.user.repository;

import com.green.farm_animals_shop.user.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, String> {

  Optional<Member> findByUserId(String userId); // 사용자 ID로 회원 조회
  boolean existsByUserId(String userId); // 사용자 ID로 회원 존재 여부 확인
}
