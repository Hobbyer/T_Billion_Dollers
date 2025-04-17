package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AdminService {
  // 기온 데이터 추출
  List<EnvironDTO> getTemp();

  // 전체 회원 조회
  List<MemberResponseDTO> getAllMembers();

  // 회원 검색
  List<MemberResponseDTO> searchMembers(String keyword);
}
