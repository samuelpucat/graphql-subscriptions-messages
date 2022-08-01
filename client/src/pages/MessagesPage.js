import { useQuery, gql, useMutation } from "@apollo/client";
import { useCallback } from "react";
import MessagesForm from "../features/messages/MessagesForm";
import MessagesList from "../features/messages/MessagesList";

// #region [GQL]
const GET_MESSAGES = gql`
  query GET_MESSAGES {
    messages {
      id
      text
      __typename
    }
  }
`;

const MESSAGES_SUBSCRIPTION = gql`
  subscription MESSAGES_SUBSCRIPTION {
    messages {
      id
      text
      __typename
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation SEND_MESSAGE($text: String!) {
    sendMessage(text: $text) {
      id
      text
      __typename
    }
  }
`;
// #endregion

function MessagesPage() {
  // #region [hooks]
  const {
    loading: getMessagesLoading,
    error: getMessagesError,
    data: getMessagesData,
    subscribeToMore,
  } = useQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const subscribeToNewMessages = useCallback(() => {
    return subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newMessages = [...prev.messages, subscriptionData.data.messages];

        return {
          ...prev,
          messages: newMessages,
        };
      },
    });
  }, [subscribeToMore]);
  // #endregion

  // #region [handlers]
  const handleSendMessage = async (text) => {
    try {
      const result = await sendMessage({ variables: { text } });
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("sending message was not successful");
    }
  };
  // #endregion

  // #region [render]
  if (getMessagesLoading) {
    return "Loading...";
  }

  if (getMessagesError) {
    return `Error! ${getMessagesError.message}`;
  }

  return (
    <div>
      <MessagesForm onSendMessage={handleSendMessage} />

      <MessagesList
        messages={getMessagesData.messages}
        subscribeToNewMessages={subscribeToNewMessages}
      />
    </div>
  );
  // #endregion
}

export default MessagesPage;
