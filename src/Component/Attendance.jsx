import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUsers, removeUsers } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import Sidebar from "./Sidebar";
import { auth } from "../utils/firebase";

const Attendance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // it is a type of auth state listener whenver it the page hits this automatic call
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        dispatch(
          addUsers({ uid: uid, email: email, displayName: displayName })
        );
        navigate("/attendance");
      } else {
        dispatch(removeUsers());
        navigate("/");
      }
    });
  }, []);

  return (
    <>
      <div className="dasboard-container flex text-white w-[100%] h-[100vh] bg-[#eaeaea]">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Attendance;
