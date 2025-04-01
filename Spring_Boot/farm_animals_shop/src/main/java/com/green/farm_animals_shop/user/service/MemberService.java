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

@Service // 이 클래스가 서비스 레이어의 컴포넌트임을 나타냄
@RequiredArgsConstructor // 생성자 주입을 위한 롬복 어노테이션
@Transactional(readOnly = true) // 읽기 전용 트랜잭션을 설정하여 데이터베이스의 일관성을 유지
public class MemberService {

  private final MemberRepository memberRepository; // 회원 리포지토리
  private final PasswordEncoder passwordEncoder; // 비밀번호 인코더

  public MemberResponseDTO getMyInfoBySecurity() { // 현재 로그인한 사용자의 정보를 가져오는 메서드
    return memberRepository.findByUserId(SecurityUtil.getCurrentMemberId()) // 현재 로그인한 사용자 ID로 회원 정보 조회
        .map(MemberResponseDTO::of) // 조회된 회원 정보를 MemberResponseDTO로 변환
        .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다.")); // 예외 처리
  }

  @Transactional
  public MemberResponseDTO changeMemberPassword(String userId, String oldPassword, String newPassword) { // 비밀번호 변경 메서드
    Member member = memberRepository.findByUserId(SecurityUtil.getCurrentMemberId()) // 현재 로그인한 사용자 ID로 회원 정보 조회
        .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다.")); // 예외 처리

    if (!passwordEncoder.matches(oldPassword, member.getPassword())) { // 비밀번호 일치 여부 확인
      throw new RuntimeException("비밀번호가 일치하지 않습니다."); // 예외 처리
    } else {
      member.setPassword(passwordEncoder.encode(newPassword)); // 비밀번호 암호화
      return MemberResponseDTO.of(memberRepository.save(member)); // 회원 정보 저장
    }
  }
}
