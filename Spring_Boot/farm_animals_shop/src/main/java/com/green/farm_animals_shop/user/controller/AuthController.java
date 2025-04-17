package com.green.farm_animals_shop.user.controller;

import com.green.farm_animals_shop.admin.dto.SmsRequestDTO;
import com.green.farm_animals_shop.admin.dto.SmsVerifyRequestDTO;
import com.green.farm_animals_shop.admin.service.SmsService;
import com.green.farm_animals_shop.user.dto.MemberRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.dto.TokenDTO;
import com.green.farm_animals_shop.user.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController // 이 클래스가 RESTful 웹 서비스의 컨트롤러임을 나타냄
@RequiredArgsConstructor // 생성자 주입을 위한 롬복 어노테이션
@RequestMapping("/auth") // URL 경로를 "/auth"로 설정

public class AuthController {

  private final AuthService authService;
  private final SmsService smsService;

  @PostMapping("/signup")
  public ResponseEntity<MemberResponseDTO> signup(@RequestBody MemberRequestDTO requestDTO) {
    return ResponseEntity.ok(authService.signup(requestDTO)); // 회원가입 요청 처리
  }

  @PostMapping("/check-user-id")
  public ResponseEntity<Map<String, Boolean>> checkUserId(@RequestBody Map<String, String> requestBody) {
    String userId = requestBody.get("userId"); // 클라이언트에서 보낸 userId 가져오기

    boolean exists = authService.checkUserIdExists(userId); // 아이디 중복 체크
    Map<String, Boolean> response = new HashMap<>();
    response.put("exists", exists); // exists가 true이면 아이디 중복, false이면 사용 가능

    return ResponseEntity.ok(response); // 결과 반환
  }

  @PostMapping("/login")
  public ResponseEntity<TokenDTO> login(@RequestBody MemberRequestDTO requestDTO) {
    return ResponseEntity.ok(authService.login(requestDTO)); // 로그인 요청 처리
  }

  // 리프레시 토큰 요청 처리
  @PostMapping("/refresh")
  public ResponseEntity<TokenDTO> refreshToken(@RequestBody Map<String, String> request) {
    String refreshToken = request.get("refreshToken");
    TokenDTO tokenDTO = authService.reissueToken(refreshToken);
    return ResponseEntity.ok(tokenDTO);
  }

  @PostMapping("/send")
  public ResponseEntity<?> sendSms(@RequestBody SmsRequestDTO requestDTO) throws Exception {
    smsService.sendSms(requestDTO.getPhoneNumber());
    return ResponseEntity.ok().build();
  }

  @PostMapping("/verify")
  public ResponseEntity<?> verifySms(@RequestBody SmsVerifyRequestDTO requestDTO) {
    boolean success = smsService.verifyCode(requestDTO.getPhoneNumber(), requestDTO.getCode());
    return ResponseEntity.ok(Map.of("success", success));
  }
}
