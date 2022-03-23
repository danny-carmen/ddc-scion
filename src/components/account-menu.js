import React, { useState } from "react";
import { auth, db } from "../firebase-config";
import { signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  writeBatch,
} from "firebase/firestore";

const logout = async () => {
  await signOut(auth);
};

const AccountMenu = (props) => {
  const [newListName, setNewListName] = useState("");

  const addNewList = async () => {
    // methods for creating new, updating for all items  // trim the name
    debugger;
    const initialListItemRef = doc(collection(db, "list-items"));
    const newListId = props.userId + "_" + newListName;
    debugger;

    const batch = writeBatch(db);

    batch.set(initialListItemRef, {
      listItemVersion: "0.0.1",
      list: newListId,
      isOpen: true,
      content: newListName,
      childrenIds: [],
      rootItem: true,
      isCompleted: false,
    });
    // const initialListItem = await setDoc(initialListItemRef, {
    //   listItemVersion: "0.0.1",
    //   list: newListId,
    //   isOpen: true,
    //   content: newListName,
    //   childrenIds: [],
    // });

    batch.set(doc(db, "lists", newListId), {
      user: props.userId,
      name: newListName,
    });
    // await setDoc(doc(db, "lists", newListId), {
    //   user: props.userId,
    //   name: newListName,
    //   rootItem: initialListItem,
    // });
    debugger;
    batch.set(
      doc(db, "users", props.userId),
      { currentList: newListId },
      { merge: true }
    );
    // await setDoc(
    //   doc(db, "users", props.userId),
    //   { currentList: newListId },
    //   { merge: true }
    // );
    await batch.commit();

    props.setCurrentList(newListId);

    // await setDoc(db, "lists", newListId);

    //add new list item
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <div>
        <input
          placeholder="Create New List"
          onChange={(event) => setNewListName(event.target.value)}
        />
        <button onClick={addNewList}>Create New List</button>
      </div>
    </div>
  );
};

export default AccountMenu;
