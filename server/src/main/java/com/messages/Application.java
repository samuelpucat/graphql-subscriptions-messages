package com.messages;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.messages.domain.Message;
import com.messages.repository.MessageRepository;

import javax.annotation.PostConstruct;
import javax.servlet.Filter;

@SpringBootApplication
@EnableJpaRepositories
@EnableTransactionManagement
public class Application {

	@Autowired
	private MessageRepository messageRepository;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Bean
	public Filter OpenFilter() {
		return new OpenEntityManagerInViewFilter();
	}

	@PostConstruct
	public void init() {
		Message m1 = Message.builder()
				.text("Hello world")
				.build();
		Message m2 = Message.builder()
				.text("How are you?")
				.build();
		messageRepository.save(m1);
		messageRepository.save(m2);
	}
}
