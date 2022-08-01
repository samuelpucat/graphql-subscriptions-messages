package com.messages.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.messages.domain.Message;

@Repository
public interface MessageRepository extends CrudRepository<Message, Long> {
}
