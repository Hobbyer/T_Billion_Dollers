package com.green.farm_animals_shop.user.service;

import com.green.farm_animals_shop.jwt.TokenProvider;
import com.green.farm_animals_shop.user.dto.MemberRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.dto.TokenDTO;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service // 이 클래스가 서비스 레이어의 컴포넌트임을 나타냄
@RequiredArgsConstructor // 생성자 주입을 위한 롬복 어노테이션
@Transactional // 읽기 전용 트랜잭션을 설정하여 데이터베이스의 일관성을 유지
public class AuthService {

  private final AuthenticationManagerBuilder managerBuilder; // 인증 매니저 빌더
  private final MemberRepository memberRepository; // 회원 리포지토리
  private final PasswordEncoder passwordEncoder; // 비밀번호 인코더
  private final TokenProvider tokenProvider; // JWT 토큰 제공자

  public MemberResponseDTO signup(MemberRequestDTO requestDTO) { // 회원가입 요청 처리
    if (memberRepository.existsByUserId(requestDTO.getUserId())) { // 이미 존재하는 사용자 ID인지 확인
      throw new RuntimeException("이미 존재하는 사용자 ID입니다."); // 예외 처리
    }

    Member member = requestDTO.toMember(passwordEncoder); // 비밀번호 암호화
    return MemberResponseDTO.of(memberRepository.save(member)); // 회원 정보 저장
  }

  public boolean checkUserIdExists(String userId) { // 사용자 ID 중복 체크
    return memberRepository.existsByUserId(userId); // 사용자 ID 존재 여부 반환
  }

  // 기존 로그인 메서드 (액세스 토큰 사용)
  public TokenDTO login(MemberRequestDTO requestDTO) { // 로그인 요청 처리
    UsernamePasswordAuthenticationToken authenticationToken = requestDTO.toAuthentication(); // 사용자 인증 정보 생성
    Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken); // 인증 처리

    return tokenProvider.generateTokenDTO(authentication); // JWT 토큰 생성
  }

  // 리프레시 토큰을 이용해 새 토큰을 발급하는 메서드
  public TokenDTO reissueToken(String refreshToken) {
    if (!tokenProvider.validateToken(refreshToken)) { // 리프레시 토큰 유효성 검사
      throw new RuntimeException("유효하지 않은 리프레시 토큰입니다."); // 예외 처리
    }
    // 리프레시 토큰의 클레임에서 사용자 정보를 얻습니다.
    Authentication authentication = tokenProvider.getAuthentication(refreshToken);

    return tokenProvider.generateTokenDTO(authentication); // 새로운 액세스 토큰과 리프레시 토큰 생성
  }
}
