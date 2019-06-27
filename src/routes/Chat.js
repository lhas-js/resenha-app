import firebase from "firebase";
import React, { useEffect, useState } from "react";

const Chat = props => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    const db = firebase.firestore();
    db.collection(`rooms/${props.match.params.room}/messages`)
      .get()
      .then(snapshot => {
        const response = snapshot.docs.map(snapshot => ({
          id: snapshot.id,
          ...snapshot.data()
        }));
        setMessages(response);
      });
  }, []);

  console.log("props", props);

  return <div>ae</div>;
};
export default Chat;
