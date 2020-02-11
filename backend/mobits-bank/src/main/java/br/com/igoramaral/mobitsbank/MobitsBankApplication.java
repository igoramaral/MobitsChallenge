package br.com.igoramaral.mobitsbank;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class MobitsBankApplication {

	public static void main(String[] args) {
		SpringApplication.run(MobitsBankApplication.class, args);
	}

}
