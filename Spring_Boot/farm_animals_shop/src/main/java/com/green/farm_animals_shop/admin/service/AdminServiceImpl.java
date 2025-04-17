package com.green.farm_animals_shop.admin.service;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;
import com.green.farm_animals_shop.admin.mapper.AdminMapper;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService{

  private final AdminMapper adminMapper;
  private final MemberRepository memberRepository;

  @Override
  public List<EnvironDTO> getTemp() {
    return adminMapper.getTemp();
  }

  @Override
  public List<MemberResponseDTO> getAllMembers() {
    return memberRepository.findAll().stream()
        .map(MemberResponseDTO::fromEntity)
        .toList();
  }

  @Override
  public List<MemberResponseDTO> searchMembers(String keyword) {
    return memberRepository.searchMembersByKeyword(keyword).stream()
        .map(MemberResponseDTO::fromEntity)
        .toList();
  }
}
