import React from "react";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";

const logout = async () => {
  await signOut(auth);
};

const AccountMenu = () => {
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default AccountMenu;
