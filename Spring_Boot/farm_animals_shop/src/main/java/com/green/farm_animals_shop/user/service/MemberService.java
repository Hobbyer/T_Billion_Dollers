package com.green.farm_animals_shop.user.service;

import com.green.farm_animals_shop.config.SecurityUtil;
import com.green.farm_animals_shop.user.dto.ChangePasswordRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
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
  public MemberResponseDTO changeMemberPassword(ChangePasswordRequestDTO changePasswordRequestDTO) {
    // 현재 로그인한 사용자의 정보를 조회
    Member member = memberRepository.findByUserId(SecurityUtil.getCurrentMemberId())
            .orElseThrow(() -> new RuntimeException("회원 정보를 찾을 수 없습니다."));

    // 새 비밀번호와 새 비밀번호 확인이 일치하는지 확인
    if (!changePasswordRequestDTO.isNewPasswordValid()) {
      throw new IllegalArgumentException("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
    }

    // 기존 비밀번호가 일치하는지 확인
    if (!passwordEncoder.matches(changePasswordRequestDTO.getOldPassword(), member.getPassword())) {
      throw new IllegalArgumentException("현재 비밀번호가 일치하지 않습니다.");
    }

    // 새 비밀번호 암호화
    member.setPassword(passwordEncoder.encode(changePasswordRequestDTO.getNewPassword()));

    // 비밀번호 변경 후 저장
    return MemberResponseDTO.of(memberRepository.save(member));
  }


  // 사용자 정보를 수정하는 메서드
  @Transactional
  public Member updateMemberInfo(String userId, MemberRequestDTO requestDTO) {
    Member member = memberRepository.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

    // name, phoneNumber, address는 필수라고 가정
    if (requestDTO.getName() != null) member.setName(requestDTO.getName());
    if (requestDTO.getEmail() != null) member.setEmail(requestDTO.getEmail());
    if (requestDTO.getPhoneNumber() != null) member.setPhoneNumber(requestDTO.getPhoneNumber());
    if (requestDTO.getAddress() != null) member.setAddress(requestDTO.getAddress());

    // 비밀번호는 별도 API 사용 권장 → 아래 로직 제거 가능
    if (requestDTO.getPassword() != null && !requestDTO.getPassword().isBlank()) {
      throw new IllegalArgumentException("비밀번호 변경은 별도 API를 이용해주세요.");
    }

    return memberRepository.save(member);
  }
}
