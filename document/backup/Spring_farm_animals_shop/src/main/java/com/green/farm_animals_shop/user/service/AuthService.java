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

@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {

  private final AuthenticationManagerBuilder managerBuilder;
  private final MemberRepository memberRepository;
  private final PasswordEncoder passwordEncoder;
  private final TokenProvider tokenProvider;

  public MemberResponseDTO signup(MemberRequestDTO requestDTO) {
    if (memberRepository.existsByUserId(requestDTO.getUserId())) {
      throw new RuntimeException("이미 존재하는 사용자 ID입니다.");
    }

    Member member = requestDTO.toMember(passwordEncoder);
    return MemberResponseDTO.of(memberRepository.save(member));
  }

  public TokenDTO login(MemberRequestDTO requestDTO) {
    UsernamePasswordAuthenticationToken authenticationToken = requestDTO.toAuthentication(); // 사용자 인증 정보 생성

    Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken); // 인증 처리

    return tokenProvider.generateTokenDTO(authentication); // JWT 토큰 생성
  }
}
