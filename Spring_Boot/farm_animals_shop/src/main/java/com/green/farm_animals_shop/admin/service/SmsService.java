package com.green.farm_animals_shop.admin.service;

import lombok.RequiredArgsConstructor;
import net.nurigo.sdk.message.exception.NurigoEmptyResponseException;
import net.nurigo.sdk.message.exception.NurigoMessageNotReceivedException;
import net.nurigo.sdk.message.exception.NurigoUnknownException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;
import net.nurigo.sdk.message.model.Message;


import java.util.Map;
import java.util.concurrent.ConcurrentHashMap; //ConcurreuntHashMap은 멀티스레드 환경에서 안전하게 사용할 수 있는 HashMap입니다.

@Service
public class SmsService {

  @Value("${coolsms.apiKey}")
  private String apiKey;

  @Value("${coolsms.apiSecret}")
  private String apiSecret;

  @Value("${coolsms.sender}")
  private String senderPhone;

  private final Map<String, String> codeStore = new ConcurrentHashMap<>();

  private final DefaultMessageService messageService;

  public SmsService(
      @Value("${coolsms.apiKey}") String apiKey,
      @Value("${coolsms.apiSecret}") String apiSecret
  ) {
    this.messageService = NurigoApp.INSTANCE.initialize(apiKey, apiSecret, "https://api.coolsms.co.kr");
  }

  public void sendSms(String phoneNumber) throws NurigoMessageNotReceivedException, NurigoEmptyResponseException, NurigoUnknownException {
    String code = generateCode();
    codeStore.put(phoneNumber, code);

    Message message = new Message();
    message.setFrom(senderPhone);
    message.setTo(phoneNumber);
    message.setText("[Farm Animals Shop] 인증번호는 " + code + "입니다.");

    var response = messageService.send(message);
    System.out.println(response);
  }

  public boolean verifyCode(String phoneNumber, String code) {
    return code.equals(codeStore.get(phoneNumber));
  }

  private String generateCode() {
    return String.valueOf((int)(Math.random() * 900000) + 100000); // 6자리 랜덤 숫자 생성
  }
}
