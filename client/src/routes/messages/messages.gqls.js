import { gql } from "@apollo/client";

export const GET_MESSAGES = gql`
  query GET_MESSAGES {
    messages {
      id
      text
      oldText
      __typename
    }
  }
`;

export const MESSAGES_SUBSCRIPTION = gql`
  subscription MESSAGES_SUBSCRIPTION {
    messages {
      id
      text
      __typename
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SEND_MESSAGE($text: String!) {
    sendMessage(text: $text) {
      id
      text
      __typename
    }
  }
`;
