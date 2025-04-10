package com.green.farm_animals_shop.user.service;

import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service // 이 클래스가 서비스 레이어의 컴포넌트임을 나타냄
@RequiredArgsConstructor // 생성자 주입을 위한 롬복 어노테이션
public class CustomUserDetailsService implements UserDetailsService {

  private final MemberRepository memberRepository; // 회원 리포지토리

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException { // 사용자 이름으로 회원 정보 조회
    return memberRepository.findByUserId(username) // 사용자 ID로 회원 정보 조회
        .map(this::createUserDetails) // 조회된 회원 정보를 UserDetails로 변환
        .orElseThrow(() -> new UsernameNotFoundException(username + " -> 데이터베이스에서 찾을 수 없습니다.")); // 예외 처리
  }

  private UserDetails createUserDetails(Member member) { // 회원 정보를 UserDetails로 변환하는 메서드
    GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(member.getAuthority().toString()); // 권한 정보 생성

    return new User( // UserDetails 객체 생성
        String.valueOf(member.getUserId()), // 사용자 ID
        member.getPassword(), // 비밀번호
        Collections.singleton(grantedAuthority) // 권한 정보
    );
  }
}
