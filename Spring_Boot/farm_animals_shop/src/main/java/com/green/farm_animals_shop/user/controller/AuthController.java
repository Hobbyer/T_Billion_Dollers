package com.green.farm_animals_shop.user.controller;

import com.green.farm_animals_shop.user.dto.MemberRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.dto.TokenDTO;
import com.green.farm_animals_shop.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냄
@RequiredArgsConstructor // 생성자 주입을 위한 롬복 어노테이션
@RequestMapping("/auth") // URL 경로를 "/auth"로 설정

public class AuthController {

  private final AuthService authService;

  @PostMapping("/signup")
  public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO requestDTO) {
    return ResponseEntity.ok(authService.signup(requestDTO)); // 회원가입 요청 처리
  }

  @PostMapping("/login")
  public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO requestDTO) {
    return ResponseEntity.ok(authService.login(requestDTO)); // 로그인 요청 처리
  }
}
