import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addAccount, logoutUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the user's display name is null
        if (user.displayName === null) {
          // If display name is null, fetch the latest user data
          // This is to handle the delay caused by updateProfile
          const { uid, email, displayName } = auth.currentUser;
          dispatch(
            addAccount({
              uid: uid,
              email: email,
              displayName: displayName,
            })
          );
        } else {
          // If display name is already updated, use the current user data
          const { uid, email, displayName } = user;
          dispatch(
            addAccount({
              uid: uid,
              email: email,
              displayName: displayName,
            })
          );
        }

        navigate("/mainPage");
      } else {
        dispatch(logoutUser());
        navigate("/");
      }
    });

    // Unsubscribe the listener when the component unmounts
    return () => unsubscribe();
  }, []);
  return <div>Main</div>;
};

export default Main;