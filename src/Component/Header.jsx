import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { avatar_img_logo } from "../utils/constants";

const Header = () => {
  const [dropDown, setdropDown] = useState(false);
  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  const handleDropDown = () => {
    setdropDown(!dropDown);
  };
  return (
    <>
      <nav className="px-10 flex justify-between items-center min-h-[10vh]">
        <div className="logo font-bold text-lg uppercase tracking-wider">
          Attendance System
        </div>
        <ul className="flex space-x-5 items-center">
          <img
            className="w-[40px] cursor-pointer"
            src={avatar_img_logo}
            alt=""
            onClick={handleDropDown}
          />
        </ul>
      </nav>
      <div
        className={`absolute w-[10rem] max-md:w-[15rem] h-[20vh] transition-all duration-300 ${
          dropDown ? "opacity-100 scale-100" : "opacity-0 scale-95"
        } top-13 rounded-md shadow-lg right-10 bg-orange-300 transform origin-top-right`}
      >
        <h1 className=" hover:underline ml-5 mt-4 font-bold cursor-pointer ">
          Admin Profile
        </h1>
        <button
          onClick={handleLogout}
          className="w-full hover:underline mt-2 font-bold  "
        >
          Log out
        </button>
      </div>
    </>
  );
};

export default Header;
