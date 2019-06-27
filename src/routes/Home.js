import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [redirectToChat, setRedirectToChat] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setRedirectToChat(true);
  };

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("rooms").onSnapshot(snapshot => {
      const response = snapshot.docs.map(snapshot => ({
        id: snapshot.id,
        ...snapshot.data()
      }));
      if (!room) setRoom(response[0].id);
      setRooms(response);
    });
  }, [room]);

  if (redirectToChat) return <Redirect to={`/chat/${name}/${room}`} />;

  return (
    <div style={{ margin: 20 }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Seu nome</Form.Label>
          <Form.Control
            type="text"
            placeholder="p.e. John Galt"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="room">
          <Form.Label>Sala</Form.Label>
          <Form.Control
            as="select"
            value={room}
            onChange={event => setRoom(event.target.value)}
          >
            {rooms.map(_room => (
              <option value={_room.id} key={_room.id}>
                {_room.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button
          disabled={name.trim().length === 0}
          variant="primary"
          type="submit"
        >
          Entrar no ResenhaApp
        </Button>
      </Form>
    </div>
  );
};

export default Home;
