import React, { useEffect } from "react";

function MessagesList(props) {
  // #region [props]
  const { messages, subscribeToNewMessages } = props;
  // #endregion

  // #region [hooks]
  useEffect(() => subscribeToNewMessages(), [subscribeToNewMessages]);
  // #endregion

  // #region [render]
  return (
    <ul>
      {messages.map((message) => {
        return <li key={message.id}>{message.text}</li>;
      })}
    </ul>
  );
  // #endregion
}

export default MessagesList;
