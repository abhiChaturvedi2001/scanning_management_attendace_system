import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Main = () => {
  const toggle = useSelector((store) => store.appMode.toggle);
  return (
    <>
      <ToastContainer />
      <div className=" bg-purple-300 w-full h-[100vh] relative ">
        <div
          className={` ${
            !toggle ? `bg-white` : `bg-gray-400`
          } shadow-lg w-full h-[100vh] flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `}
        >
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Main;
