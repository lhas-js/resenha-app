import firebase from "firebase";
import React, { useEffect, useRef, useState } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import TimeAgo from "react-timeago";

const Chat = props => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messageListRef = useRef(null);

  useEffect(() => {
    const db = firebase.firestore();
    db.collection(`rooms/${props.match.params.room}/messages`)
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        const response = snapshot.docs.map(snapshot => ({
          id: snapshot.id,
          ...snapshot.data()
        }));
        setMessages(response);
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      });
  }, [props]);

  const onSubmit = event => {
    event.preventDefault();

    const db = firebase.firestore();
    db.collection(`rooms/${props.match.params.room}/messages`).add({
      createdAt: +new Date(),
      username: props.match.params.name,
      content: message
    });
    setMessage("");
  };

  return (
    <div style={{ margin: "1vh" }}>
      <Card
        ref={messageListRef}
        style={{ height: "calc(98vh - 100px)", overflowY: "scroll" }}
      >
        <ListGroup>
          {messages.map(_message => (
            <ListGroup.Item key={_message.id}>
              <strong>@{_message.username}</strong>
              <time
                style={{ fontSize: 12, marginLeft: 5, color: "var(--gray)" }}
              >
                <TimeAgo date={_message.createdAt} />
              </time>
              <p>{_message.content}</p>
              <Badge pill variant="light" />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card>

      <Card style={{ height: "100px" }}>
        <form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            margin: "20px"
          }}
        >
          <input
            value={message}
            onChange={event => setMessage(event.target.value)}
            style={{ width: "100%" }}
            type="text"
          />
          <button>OK</button>
        </form>
      </Card>
    </div>
  );
};

export default Chat;
