package com.messages.resolvers;

import graphql.kickstart.tools.GraphQLQueryResolver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.messages.domain.Message;
import com.messages.repository.MessageRepository;

import java.util.List;

@Component
public class Query implements GraphQLQueryResolver {

    @Autowired
    private MessageRepository messageRepository;

    public List<Message> messages() {
        return (List<Message>) messageRepository.findAll();
    }
}
