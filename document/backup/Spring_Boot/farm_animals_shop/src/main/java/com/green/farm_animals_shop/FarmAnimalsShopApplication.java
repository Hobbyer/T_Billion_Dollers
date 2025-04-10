package com.green.farm_animals_shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.green.farm_animals_shop")
public class FarmAnimalsShopApplication {

	public static void main(String[] args) {
		SpringApplication.run(FarmAnimalsShopApplication.class, args);

		System.getenv("MYSQL_URL");

	}

}
