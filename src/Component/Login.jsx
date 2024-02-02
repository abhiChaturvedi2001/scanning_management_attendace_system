import React, { useEffect, useRef, useState } from "react";
import { auth } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { checkValidate } from "../utils/validate";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addAccount, logoutUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
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

  const handleValidation = () => {
    const message = checkValidate(email.current.value, password.current.value);
    seterrorMessage(message);
    if (message) return;
    getAdminData();
  };

  const getAdminData = async () => {
    const collectionRef = collection(db, "Admin");
    const q = query(
      collectionRef,
      where("AdminID", "==", email.current.value),
      where("AdminPassword", "==", password.current.value)
    );
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => {
      handleLogin(doc.data());
    });
  };

  const handleLogin = (userData) => {
    const { AdminID, AdminPassword, AdminName } = userData;

    signInWithEmailAndPassword(auth, AdminID, AdminPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the display name
        updateProfile(user, {
          displayName: AdminName,
        })
          .then(() => {
            // Wait for a short period to ensure the display name is updated
            setTimeout(() => {
              dispatch(
                addAccount({
                  uid: user.uid,
                  email: AdminID,
                  displayName: AdminName,
                })
              );
              toast.success("Successfully Logged In", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
              });
            }, 500);
          })
          .catch((error) => {
            console.error("Error updating profile:", error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMessage(`${errorCode} - ${errorMessage}`);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute top-1/2 w-[31rem] max-sm:w-[90%] px-7 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-center font-bold  font-poppins text-3xl">
          Automated Attendance System
        </h1>
        <p className="text-center mt-3 font-medium font-poppins">
          Mark Your Attendance Unique Way
        </p>
        <form onSubmit={(e) => e.preventDefault()} className="mt-6">
          <div>
            <label className="font-bold font-poppins">Email</label>
            <input
              ref={email}
              className="block w-full px-2 py-2 mt-2 rounded-lg overflow-hidden outline-none bg-gray-100 shadow-md"
              type="email"
              placeholder="example@1234"
            />
          </div>
          <div className="mt-6">
            <label className="font-bold font-poppins">Password</label>
            <input
              ref={password}
              className="block w-full px-2 py-2 mt-2 rounded-lg overflow-hidden outline-none
               bg-gray-100 shadow-md"
              type="password"
              placeholder="your password"
            />
          </div>
          <button
            onClick={handleValidation}
            className="mt-6 bg-purple-500 rounded-lg overflow-hidden shadow-lg w-full text-white font-poppins font-bold py-2 cursor-pointer"
          >
            Login
          </button>
          <p className="text-center mt-4 font-medium font-poppins">
            {errorMessage}
          </p>
          <p className="text-center mt-4 font-medium font-poppins">
            Welcome our App 👋🏻 Please Login using Admin Cridentials
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
