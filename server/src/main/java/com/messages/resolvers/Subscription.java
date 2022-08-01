package com.messages.resolvers;

import graphql.kickstart.tools.GraphQLSubscriptionResolver;
import lombok.RequiredArgsConstructor;

import org.reactivestreams.Publisher;
import org.springframework.stereotype.Component;

import com.messages.domain.Message;
import com.messages.publisher.MessagePublisher;

@Component
@RequiredArgsConstructor
public class Subscription implements GraphQLSubscriptionResolver {

    private final MessagePublisher messagePublisher;

    public Publisher<Message> messages() {
        return messagePublisher.getMessagePublisher();
    }
} 
