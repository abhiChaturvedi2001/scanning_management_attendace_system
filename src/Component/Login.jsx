import React, { useRef, useState, useEffect } from "react";
import { checkValidate } from "../utils/validate";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { db } from "../utils/firebase";
import { addUsers, removeUsers } from "../utils/userSlice";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let email = useRef(null);
  let password = useRef(null);

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

  // handle to login validation
  const handleLoginValidation = async () => {
    const message = checkValidate(email.current.value, password.current.value);
    seterrorMessage(message);
    if (message) return;
    const collectionRef = collection(db, "Admin");
    const q = query(
      collectionRef,
      where("AdminID", "==", email.current.value),
      where("AdminPassword", "==", password.current.value)
    );
    const snapShot = await getDocs(q);
    snapShot.forEach((data) => handleLogin(data.data()));
  };

  const handleLogin = (userData) => {
    const email = userData.AdminID;
    const password = userData.AdminPassword;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { email } = userCredential;
        dispatch(
          addUsers({
            email: email,
          })
        );
      })
      .catch((error) => {
        seterrorMessage(error.message);
      });
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {})
      .catch((error) => {
        seterrorMessage(error.message);
      });
  };
  return (
    <>
      <div className="flex items-center justify-between">
        {/* Existing content for Sign In */}
        <div className={`right bg-[#512da8] px-5  h-screen w-[50%]`}>
          <div className="text-center flex flex-col justify-center h-[100vh] ">
            <h1 className="text-white font-bold text-[50px]">Welcome 😂</h1>
            <p className="text-white tracking-wider ">
              {" "}
              "Already user ? Please click to the sign in button"{" "}
            </p>
          </div>
        </div>
        <div className={`left text-center mx-auto w-[30%]`}>
          <h1 className="text-[25px] font-bold">
            Heey 👋🏻 ! Please Sign into Your Account
          </h1>
          <div className="mt-4">
            <input
              ref={email}
              className="block bg-slate-100 px-3 py-3 w-full rounded-md"
              type="text"
              placeholder="example@gmail.com"
            />
            <input
              ref={password}
              className="block bg-slate-100 rounded-md px-3 py-3 w-full mt-3"
              type="password"
              placeholder="ex:Pass@123"
            />
            <h1 className="mt-4 hover:underline cursor-pointer">
              Forgot Password ?{" "}
            </h1>
            <p className="text-red-500 font-bold">{errorMessage}</p>
            <button
              onClick={handleLoginValidation}
              className="bg-[#512da8] px-2 py-2 mt-4 rounded-md cursor-pointer text-white w-[40%] max-sm:w-full"
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
