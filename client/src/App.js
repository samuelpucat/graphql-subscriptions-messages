import { useQuery, gql, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";

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

function AppInner(props) {
  const { messages, subscribeToMore } = props;

  const [text, setText] = useState("");
  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: MESSAGES_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        const newMessages = [...prev.messages, subscriptionData.data.messages];

        return {
          ...prev,
          messages: newMessages,
        };
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage({ variables: { text } });
    setText("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={text} onChange={handleTextChange} />
        <button type="submit" disabled={loading}>
          send
        </button>
      </form>
      <ul>
        {messages.map((message) => {
          return <li key={message.id}>{message.text}</li>;
        })}
      </ul>
    </div>
  );
}

function App() {
  const { loading, error, data, subscribeToMore } = useQuery(GET_MESSAGES);

  if (loading) return "Loading...";

  if (error) return `Error! ${error.message}`;

  if (data == null) return "No data";

  return (
    <AppInner messages={data.messages} subscribeToMore={subscribeToMore} />
  );
}

export default App;

