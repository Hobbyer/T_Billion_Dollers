package com.green.farm_animals_shop.user.service;

import com.green.farm_animals_shop.config.SecurityUtil;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Security;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;

  public MemberResponseDTO getMyInfoBySecurity() {
    return memberRepository.findByUserId(SecurityUtil.getCurrentMemberId())
        .map(MemberResponseDTO::of)
        .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));
  }

  @Transactional
  public MemberResponseDTO changeMemberPassword(String userId, String oldPassword, String newPassword) {
    Member member = memberRepository.findByUserId(SecurityUtil.getCurrentMemberId())
        .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));

    if (!passwordEncoder.matches(oldPassword, member.getPassword())) {
      throw new RuntimeException("비밀번호가 일치하지 않습니다.");
    } else {
      member.setPassword(passwordEncoder.encode(newPassword));
      return MemberResponseDTO.of(memberRepository.save(member));
    }
  }
}
