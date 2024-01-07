import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

const Header = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <>
      <nav className="bg-red-400 flex justify-between items-center min-h-[10vh]">
        <div className="logo">Scanner Management System</div>
        <ul className="flex space-x-5">
          <button onClick={handleLogout}>Log out</button>
        </ul>
      </nav>
    </>
  );
};

export default Header;
