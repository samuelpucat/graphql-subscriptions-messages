import React, { useState } from "react";

function MessagesForm(props) {
  // #region [props]
  const { onSendMessage } = props;
  // #endregion

  // #region [hooks]
  const [text, setText] = useState("");
  const [sendMessageLoading, setSendMessageLoading] = useState(false);
  // #endregion

  // #region [handlers]
  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text === "") {
      return;
    }

    setSendMessageLoading(true);
    await onSendMessage(text);
    setText("");
    setSendMessageLoading(false);
  };
  // #endregion

  // #region [render]
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={text} onChange={handleTextChange} />
      <button type="submit" disabled={sendMessageLoading}>
        send
      </button>
    </form>
  );
  // #endregion
}

export default MessagesForm;
