# Graphql subscriptions messages demo

Simple app to send and view messages via graphql subscriptions.

## Server

To start the server, go to /server directory, build and run gradle app. Graphql server will run on http://localhost:8080/graphql and ws://localhost:8080/subscriptions.

## Client

To start the client, go to /client directory, install node packages (npm install) and run react app (npm start). App will run on http://localhost:3000.

To test if subscriptions work, open 2 separate clients and try sending messages from both clients. Messages should be received by both clients immediately.

## Future work

Further app improvements:

- add authentication
  - add login page
  - after logging in, redirect to messages page
  - persist and show username with message
- add update of messages - only by "owner"
  - propagate message update to all clients
  - show update indicator next to message on client
- add delete of message - only by "owner"
  - propagate message update to all clients
  - hide deleted message on client
