import { useQuery, useMutation } from "@apollo/client";
import { useCallback } from "react";
import MessagesForm from "../../features/messages/MessagesForm";
import MessagesList from "../../features/messages/MessagesList";
import {
  GET_MESSAGES,
  MESSAGES_SUBSCRIPTION,
  SEND_MESSAGE,
} from "./messages.gqls";

function Messages() {
  // #region [hooks]
  const {
    loading: getMessagesLoading,
    error: getMessagesError,
    data: getMessagesData,
    subscribeToMore: getMessagesSubscribeToMore,
  } = useQuery(GET_MESSAGES);
  const [sendMessage] = useMutation(SEND_MESSAGE);

  const subscribeToNewMessages = useCallback(() => {
    return getMessagesSubscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newMessages = [...prev.messages, subscriptionData.data.messages];

        return {
          ...prev,
          messages: newMessages,
        };
      },
    });
  }, [getMessagesSubscribeToMore]);
  // #endregion

  // #region [handlers]
  const handleSendMessage = async (text) => {
    try {
      const result = await sendMessage({ variables: { text } });
      console.log(result);
    } catch (error) {
      console.log(error);
      alert("Sending message was not successful");
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
    <div style={{ padding: "1rem" }}>
      <MessagesForm onSendMessage={handleSendMessage} />

      <MessagesList
        messages={getMessagesData.messages}
        subscribeToNewMessages={subscribeToNewMessages}
      />
    </div>
  );
  // #endregion
}

export default Messages;
