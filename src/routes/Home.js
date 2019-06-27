import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("musica");
  const handleSubmit = event => {
    event.preventDefault();
    alert(`Nome: ${name} - Sala: ${room}`);
  };

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
            <option value="musica">Música</option>
            <option value="cinema">Cinema</option>
            <option value="adulto">Adulto</option>
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
