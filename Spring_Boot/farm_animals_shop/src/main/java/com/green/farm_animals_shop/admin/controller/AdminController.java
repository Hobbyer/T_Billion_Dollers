package com.green.farm_animals_shop.admin.controller;

import com.green.farm_animals_shop.admin.dto.EnvironDTO;
import com.green.farm_animals_shop.admin.service.AdminService;
import com.green.farm_animals_shop.admin.service.EnvironmentService;
import com.green.farm_animals_shop.shop.dto.DailyOrderSummaryDTO;
import com.green.farm_animals_shop.shop.service.OrderService;
import com.green.farm_animals_shop.user.dto.MemberResponseDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

  private final AdminService adminService;
  private final EnvironmentService environmentService;
  private final OrderService orderService;


  // 기온 데이터 추출
  @GetMapping("/temp")
  public List<EnvironDTO> getTemp() {
    return environmentService.getTemp();
  }

  // 습도 데이터 추출
  @GetMapping("/humidity")
  public List<EnvironDTO> getHumidity() {
    return environmentService.getHumidity();
  }

  // 전체 회원 조회
  @GetMapping("/members")
  public ResponseEntity<?> getAllMembers() {
    return ResponseEntity.ok(adminService.getAllMembers());
  }

  // 회원 검색
  @GetMapping("/members/search")
  public ResponseEntity<List<MemberResponseDTO>> searchMembers(
      @RequestParam("keyword") String keyword
  ) {
    List<MemberResponseDTO> result = adminService.searchMembers(keyword);
    return ResponseEntity.ok(result);
  }

  @GetMapping("/daily-orders")
  public ResponseEntity<?> getDailyOrderSummary() {
    List<DailyOrderSummaryDTO> orders = orderService.getDailyOrderSummary();
    return ResponseEntity.ok(orders);
  }
}
