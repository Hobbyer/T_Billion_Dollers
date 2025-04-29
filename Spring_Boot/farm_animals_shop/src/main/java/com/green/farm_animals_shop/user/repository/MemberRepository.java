package com.green.farm_animals_shop.user.repository;

import com.green.farm_animals_shop.user.dto.MemberRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository // 이 클래스가 리포지토리 레이어의 컴포넌트임을 나타냄

// JpaRepository를 상속받아 CRUD 기능을 제공
public interface MemberRepository extends JpaRepository<Member, String> {

  Optional<Member> findByUserId(String userId); // 사용자 ID로 회원 조회
  boolean existsByUserId(String userId); // 사용자 ID로 회원 존재 여부 확인

  @Query(value = """
      SELECT * FROM member
      WHERE user_id LIKE %:keyword%
        OR name LIKE %:keyword%
        OR email LIKE %:keyword%
        OR phone_number LIKE %:keyword%
        OR address LIKE %:keyword%
      """, nativeQuery = true)
  List<Member> searchMembersByKeyword(@Param("keyword") String keyword); // 회원 검색

  // 일반회원 수 조회
  @Query(value = "SELECT COUNT(*) FROM member WHERE authority = 'ROLE_USER'", nativeQuery = true)
  int countUser(); // 일반회원 수 조회
}
