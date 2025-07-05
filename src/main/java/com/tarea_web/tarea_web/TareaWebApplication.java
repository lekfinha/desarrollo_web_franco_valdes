package com.tarea_web.tarea_web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.tarea_web.tarea_web")
public class TareaWebApplication {

	public static void main(String[] args) {
		SpringApplication.run(TareaWebApplication.class, args);
	}

}
