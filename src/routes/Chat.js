import firebase from "firebase";
import React, { useEffect, useRef, useState } from "react";
import { Badge, Button, Card, Form, ListGroup } from "react-bootstrap";
import TimeAgo from "react-timeago";
import buildFormatter from "react-timeago/lib/formatters/buildFormatter";
import ptBr from "react-timeago/lib/language-strings/pt-br";

// Formatador de data
const formatter = buildFormatter(ptBr);

const Chat = props => {
  // Formulário
  const [message, setMessage] = useState("");

  // Dados do Firebase
  const [messages, setMessages] = useState([]);

  // Objeto de referência para lista de mensagens
  const messageListRef = useRef(null);

  // Instância do Firestore
  const db = firebase.firestore();

  // Callback quando a página é carregada
  useEffect(() => {
    // Solicita ao Firestore todas as mensagens que pertencem a sala selecionada
    db.collection(`rooms/${props.match.params.room}/messages`)
      // Ordena os documentos pela data de criação
      .orderBy("createdAt")
      .onSnapshot(snapshot => {
        const response = snapshot.docs.map(snapshot => ({
          id: snapshot.id,
          ...snapshot.data()
        }));
        // Atualiza o componente com os documentos retornados
        setMessages(response);
        // Usa o objeto de referêNcia da lista de mensagens para alterar a posição
        // do scroll dele para o fim da lista toda vez que os documentos atualizarem
        messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
      });
  }, [db, props]);

  // Callback quando o formulário de enviar nova mensagem é enviado
  const onSubmit = event => {
    // Previne que a página seja recarregada
    event.preventDefault();

    // Solicita ao Firestore que uma nova mensagem seja adicionada
    db.collection(`rooms/${props.match.params.room}/messages`).add({
      createdAt: +new Date(),
      username: props.match.params.name,
      content: message
    });

    // Limpa o campo de mensagem
    setMessage("");
  };

  return (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "20px"
      }}
    >
      <div
        ref={messageListRef}
        style={{ flex: 1, overflowY: "scroll", marginBottom: "20px" }}
      >
        <ListGroup>
          {messages.map(_message => (
            <ListGroup.Item key={_message.id}>
              <strong>@{_message.username}</strong>
              <time
                style={{ fontSize: 12, marginLeft: 5, color: "var(--gray)" }}
              >
                <TimeAgo date={_message.createdAt} formatter={formatter} />
              </time>
              <p>{_message.content}</p>
              <Badge pill variant="light" />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>

      <Card style={{ height: "80px" }}>
        <Form
          onSubmit={onSubmit}
          style={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            margin: "20px"
          }}
        >
          <Form.Control
            value={message}
            onChange={event => setMessage(event.target.value)}
            style={{ width: "100%", marginRight: "10px" }}
            type="text"
            placeholder="Sua mensagem aqui"
          />
          <Button variant="primary" type="submit">
            OK
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Chat;
