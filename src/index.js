import "bootstrap/dist/css/bootstrap.min.css";
import "firebase/firestore";

import firebase from "firebase/app";
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

const firebaseConfig = {
  apiKey: "AIzaSyCXpAByziLWtZmQ4nZs3zvB3AyVzcpHSYg",
  authDomain: "resenhaapp-911e5.firebaseapp.com",
  databaseURL: "https://resenhaapp-911e5.firebaseio.com",
  projectId: "resenhaapp-911e5",
  storageBucket: "resenhaapp-911e5.appspot.com",
  messagingSenderId: "604745723229",
  appId: "1:604745723229:web:0af7f38d4d93eb43"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
