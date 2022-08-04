import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SubscriptionClient } from "subscriptions-transport-ws";
import { WebSocketLink } from "@apollo/client/link/ws";
import { split, HttpLink } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const HTTP_URI = "http://localhost:8080/graphql";
const WS_URI = "ws://localhost:8080/subscriptions";

const httpLink = new HttpLink({
  uri: HTTP_URI,
});

const wsLink = new WebSocketLink(new SubscriptionClient(WS_URI));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Set up our apollo-client to point at the server we created
// this can be local or a remote endpoint
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export { client };
