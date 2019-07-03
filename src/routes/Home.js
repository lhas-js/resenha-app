import firebase from "firebase";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Redirect } from "react-router-dom";

const Home = () => {
  // Formulário
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  // Dados do Firebase
  const [rooms, setRooms] = useState([]);

  // Redirecionamento de página
  const [redirectToChat, setRedirectToChat] = useState(false);

  // Instância do Firestore
  const db = firebase.firestore();

  // Callback quando o formulário é enviado
  const handleSubmit = event => {
    // Previne que a página seja recarregada
    event.preventDefault();

    // Habilita o estado `redirectToChat`
    setRedirectToChat(true);
  };

  // Callback quando a página é carregada
  useEffect(() => {
    // Solicita ao Firestore todas as salas disponíveis
    const unsubscribe = db.collection("rooms").onSnapshot(snapshot => {
      // Formata os dados em um objeto amigável
      const response = snapshot.docs.map(snapshot => ({
        id: snapshot.id,
        // Tudo que estiver dentro do nosso documento será extendido
        // para nosso objeto graças aos três pontos "..."
        ...snapshot.data()
      }));
      // Atualizamos o nosso estado de salas com os dados formatados
      setRooms(response);
    });

    return unsubscribe;
  }, [db]);

  // Faz o redirecionamento caso o estado `redirectToChat` esteja habilitado
  if (redirectToChat) return <Redirect to={`/chat/${name}/${room}`} />;

  return (
    <div style={{ margin: 20 }}>
      <img
        style={{
          margin: "0 auto",
          display: "block",
          width: "220px",
          marginBottom: "20px"
        }}
        src="/logo.png"
        alt="ResenhaApp"
      />
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={event => setName(event.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            as="select"
            value={room}
            onChange={event => setRoom(event.target.value)}
          >
            <option value="">Escolher sala...</option>
            {rooms.map(_room => (
              <option value={_room.id} key={_room.id}>
                {_room.label}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button
          disabled={name.trim().length === 0 || room.trim().length === 0}
          variant="primary"
          type="submit"
          style={{ width: "100%" }}
        >
          Entrar
        </Button>
      </Form>
    </div>
  );
};

export default Home;
