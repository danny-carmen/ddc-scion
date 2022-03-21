import React, { useEffect, useState } from "react";
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
import { auth, db } from "./firebase-config";
import {
  doc,
  setDoc,
  getDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { insertListItemFromDb } from "./features/list-item-slice";
import { current } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState();
  const [currentList, setCurrentList] = useState("");
  const [rootItem, setRootItem] = useState("");

  onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
  });

  useEffect(async () => {
    if (user) {
      debugger;
      const userInfo = await getDoc(doc(db, "users", user.uid));
      setCurrentList(userInfo.data().currentList);
    }
  }, [user]);

  useEffect(async () => {
    //not supposed to make useeffect async? need to watch video
    debugger;
    if (currentList) {
      const q = query(
        collection(db, "list-items"),
        where("list", "==", currentList)
      );
      const querySnapshot = await getDocs(q);
      debugger;
      querySnapshot.forEach((listItem) => {
        debugger;

        const listItemToInsert = {
          id: listItem.id,
          isOpen: listItem.data().isOpen,
          listItemVersion: listItem.data().listItemVersion,
          content: listItem.data().content,
          childrenIds: listItem.data().childrenIds,
        };

        dispatch(insertListItemFromDb(listItemToInsert));
        if (listItem.data().rootItem) setRootItem(listItem.id);
        debugger;
      });
    }
    //for each item, place into reduux
  }, [currentList]);

  const register = async () => {
    try {
      debugger;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      //create database entry for user
      debugger;
      await setDoc(doc(db, "users", userCredential.user.uid), {
        currentList: "",
      });

      debugger;
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      //get the users current list
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
          <SecondaryMenu userId={user.uid} setCurrentList={setCurrentList} />
          {currentList && rootItem && <ListItem listItemId={rootItem} />}
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
