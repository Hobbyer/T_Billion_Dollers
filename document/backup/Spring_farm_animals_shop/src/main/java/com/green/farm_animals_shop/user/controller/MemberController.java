package com.green.farm_animals_shop.user.controller;

import com.green.farm_animals_shop.user.dto.ChangePasswordRequestDTO;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import com.green.farm_animals_shop.user.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")

public class MemberController {

  private final MemberService memberService;

  @GetMapping("/me")
  public ResponseEntity<MemberResponseDTO> getMyMemberInfo() {
    MemberResponseDTO myInfoBySecurity = memberService.getMyInfoBySecurity();
    System.out.println(myInfoBySecurity);
    return ResponseEntity.ok((myInfoBySecurity));
  }

  @PostMapping("/password")
  public ResponseEntity<MemberResponseDTO> setMemberPassword(@RequestBody ChangePasswordRequestDTO request) {
    return ResponseEntity.ok(memberService.changeMemberPassword(request.getUserId(), request.getOldPassword(), request.getNewPassword()));
  }
}
