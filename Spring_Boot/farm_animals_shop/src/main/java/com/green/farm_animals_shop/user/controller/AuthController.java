package com.green.farm_animals_shop.user.controller;

import com.green.farm_animals_shop.user.dto.MemberRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.dto.TokenDTO;
import com.green.farm_animals_shop.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")

public class AuthController {

  private final AuthService authService;

  @PostMapping("/signup")
  public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO requestDTO) {
    return ResponseEntity.ok(authService.signup(requestDTO));
  }

  @PostMapping("/login")
  public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO requestDTO) {
    return ResponseEntity.ok(authService.login(requestDTO));
  }
}
