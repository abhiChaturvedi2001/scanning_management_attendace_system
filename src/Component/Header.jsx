import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { FaRegUser } from "react-icons/fa";

const Header = () => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <>
      <nav className="px-10 flex justify-between items-center min-h-[10vh]">
        <div className="logo font-bold text-lg uppercase tracking-wider">
          Attendance System
        </div>
        <ul className="flex space-x-5 items-center">
          <li>
            <FaRegUser />
          </li>
          <li>{}</li>
          <button onClick={handleLogout}>Log out</button>
        </ul>
      </nav>
    </>
  );
};

export default Header;
