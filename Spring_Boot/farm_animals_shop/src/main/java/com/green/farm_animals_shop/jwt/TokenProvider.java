package com.green.farm_animals_shop.jwt;

import com.green.farm_animals_shop.user.dto.TokenDTO;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Slf4j
@Component
public class TokenProvider {

  private static final String AUTHORITIES_KEY = "auth";
  private static final String BEARER_TYPE = "bearer";
  private static final long ACCESS_TOKEN_EXPIRE_TIME = 1000L * 60 * 30; // 30분
  private final Key key; // JWT 서명에 사용되는 키

  // 주의점 : 여기서 @Value는 스프링이 제공하는 어노테이션으로, lombok의 @Value와는 다릅니다.
  // @param secretKey : application.properties에 정의된 jwt.secret 값을 주입받습니다.
  public TokenProvider(@Value("${jwt.secret}") String secretKey) {

    byte[] keyBytes = Decoders.BASE64.decode(secretKey);
    this.key = Keys.hmacShaKeyFor(keyBytes);
  }

  // 토큰을 생성하는 메서드
  public TokenDTO generateTokenDTO(Authentication authentication) {

    String authorities = authentication.getAuthorities().stream()
        .map(GrantedAuthority::getAuthority)
        .collect(Collectors.joining(","));

    long now = (new Date()).getTime();

    Date accessTokenExpiresIn = new Date(now + ACCESS_TOKEN_EXPIRE_TIME); // 액세스 토큰 만료 시간 설정

    System.out.println(accessTokenExpiresIn);

    String accessToken = Jwts.builder() // JWT 빌더 생성
        .setSubject(authentication.getName()) // JWT의 제목(Subject) 설정
        .claim(AUTHORITIES_KEY, authorities) // JWT의 클레임 설정
        .setExpiration(accessTokenExpiresIn) // JWT의 만료 시간 설정
        .signWith(key, SignatureAlgorithm.HS512) // JWT 서명 알고리즘 설정
        .compact(); // JWT 생성

    return TokenDTO.builder() // TokenDTO 객체 생성
        .grantType(BEARER_TYPE) // JWT의 권한 부여 방식 설정
        .accessToken(accessToken) // 생성된 액세스 토큰 설정
        .accessTokenExpiresIn(accessTokenExpiresIn.getTime()) // 액세스 토큰 만료 시간 설정
        .build();
  }

  public Authentication getAuthentication(String accessToken) {
    Claims claims = parseClaims(accessToken); // JWT에서 클레임을 파싱

    if (claims.get(AUTHORITIES_KEY) == null) {
      throw new RuntimeException("권한 정보가 없는 토큰입니다.");
    }

    Collection<? extends GrantedAuthority> authorities =
        Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList()); // JWT에서 권한 정보 추출

    UserDetails principal = new User(claims.getSubject(), "", authorities); // 사용자 정보 생성

    return new UsernamePasswordAuthenticationToken(principal, "", authorities); // 인증 객체 생성
  }

  public boolean validateToken(String token) {
    try {
      Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token); // JWT 검증
      return true; // 검증 성공
    } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
      log.info("잘못된 JWT 서명입니다.");
    } catch (ExpiredJwtException e) {
      log.info("만료된 JWT 토큰입니다.");
    } catch (UnsupportedJwtException e) {
      log.info("지원하지 않는 JWT 토큰입니다.");
    } catch (IllegalArgumentException e) {
      log.info("JWT 토큰이 잘못되었습니다.");
    }

    return false; // 검증 실패

  }

  private Claims parseClaims(String accessToken) {
    try {
      return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(accessToken).getBody(); // JWT에서 클레임 파싱
    } catch (ExpiredJwtException e) {
      return e.getClaims(); // 만료된 JWT의 경우 클레임 반환
    }
  }
}
