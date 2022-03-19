import React, { useState } from "react";
import "./styles/main.scss";
import ActionMenu from "./components/action-menu";
import ListItem from "./components/list-item";
import SecondaryMenu from "./components/secondary-menu";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";

function App() {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
    } catch (error) {
      console.log(error);
    }
  };

  //initial retrieval functions here
  //change login to a component at some point

  return (
    <div className="App">
      {user ? (
        <>
          <ActionMenu />
          <SecondaryMenu />
          <ListItem listItemId={0} />
        </>
      ) : (
        <>
          <input
            placeholder="Register Email"
            onChange={(event) => {
              setRegisterEmail(event.target.value);
            }}
          />
          <input
            type={"password"}
            placeholder="Register Password"
            onChange={(event) => {
              setRegisterPassword(event.target.value);
            }}
          />
          <button onClick={register}>Register</button>

          <input
            placeholder="Login Email"
            onChange={(event) => {
              setLoginEmail(event.target.value);
            }}
          />
          <input
            type={"password"}
            placeholder="Login Password"
            onChange={(event) => {
              setLoginPassword(event.target.value);
            }}
          />
          <button onClick={login}>Login</button>
        </>
      )}
    </div>
  );
}

export default App;
