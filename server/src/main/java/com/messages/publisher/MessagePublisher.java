package com.messages.publisher;

import org.reactivestreams.Publisher;
import org.springframework.stereotype.Component;

import com.messages.domain.Message;

import reactor.core.publisher.DirectProcessor;
import reactor.core.publisher.FluxProcessor;
import reactor.core.publisher.FluxSink;

@Component
public class MessagePublisher {
    private final FluxProcessor<Message, Message> processor;
    private final FluxSink<Message> sink;

    public MessagePublisher() {
        this.processor = DirectProcessor.<Message>create().serialize();
        this.sink = processor.sink();
    }

    public void publish(Message message) {
        sink.next(message);
    }

     public Publisher<Message> getMessagePublisher() {
        return processor.map(message -> {
            return message;
        });
    }
}
