package com.messages.resolvers;

import graphql.kickstart.tools.GraphQLMutationResolver;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.messages.domain.Message;
import com.messages.publisher.MessagePublisher;
import com.messages.repository.MessageRepository;

@Component
@RequiredArgsConstructor
public class Mutation implements GraphQLMutationResolver {

    @Autowired
    private MessageRepository messageRepository;

    private final MessagePublisher messagePublisher;

    public Message sendMessage(String text) {
        Message message = messageRepository.save(getMessage(text));
        messagePublisher.publish(message);
        return message;
    }

    private Message getMessage(String text) {
        return Message.builder()
                .text(text)
                .build();
    }
}
