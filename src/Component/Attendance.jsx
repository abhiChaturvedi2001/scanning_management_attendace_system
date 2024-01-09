import React, { useEffect } from "react";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUsers, removeUsers } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // when componenet is authenticate it re-render the page
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email } = user;
        dispatch(
          addUsers({
            uid: uid,
            email: email,
          })
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
      <div>
        <Header />
      </div>
    </>
  );
};

export default Attendance;
