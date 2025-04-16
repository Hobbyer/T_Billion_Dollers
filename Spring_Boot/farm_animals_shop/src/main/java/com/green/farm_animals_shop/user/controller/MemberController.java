package com.green.farm_animals_shop.user.controller;

import com.green.farm_animals_shop.user.dto.ChangePasswordRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.entity.Member;
import com.green.farm_animals_shop.user.service.CustomUserDetailsService;
import com.green.farm_animals_shop.user.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

@RestController // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냄
@RequiredArgsConstructor // 생성자 주입을 위한 롬복 어노테이션
@RequestMapping("/members") // URL 경로를 "/members"로 설정

public class MemberController {

  private final MemberService memberService; // MemberService를 주입받음

  @GetMapping("/me")
  public ResponseEntity<MemberResponseDTO> getMyMemberInfo() {
    MemberResponseDTO myInfoBySecurity = memberService.getMyInfoBySecurity(); // 현재 로그인한 사용자의 정보를 가져옴
    System.out.println(myInfoBySecurity); // 디버깅을 위한 출력
    return ResponseEntity.ok((myInfoBySecurity)); // 가져온 정보를 응답으로 반환
  }

  @PostMapping("/password")
  public ResponseEntity<MemberResponseDTO> setMemberPassword(
          @AuthenticationPrincipal User user,  // Spring Security에서 인증된 사용자
          @RequestBody @Valid ChangePasswordRequestDTO request) {
    // 인증된 사용자 ID로 비밀번호 변경 처리
    return ResponseEntity.ok(memberService.changeMemberPassword(request));
  }

  // 회원 정보 수정 API
  @PutMapping("/me/update")
  public ResponseEntity<Member> updateMember(@AuthenticationPrincipal User user, @RequestBody MemberRequestDTO request) {
    String loggedInUserId = user.getUsername();
    return ResponseEntity.ok(memberService.updateMemberInfo(loggedInUserId, request));
  }
}