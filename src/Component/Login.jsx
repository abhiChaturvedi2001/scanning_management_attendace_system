import React, { useRef, useState } from "react";
import { checkValidate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const naviagte = useNavigate();

  const name = useRef(null);
  let email = useRef(null);
  let password = useRef(null);
  const registerNumber = useRef(null);

  const handleLoginValidation = () => {
    const message = checkValidate(email.current.value, password.current.value);
    seterrorMessage(message);
    if (message) return;

    if (isSignupForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          naviagte("/attendance");
          console.log(user);
        })
        .catch((error) => {
          seterrorMessage(error.message + " " + "please sign up");
        });
    } else {
      // sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          naviagte("/attendance");
          console.log(user);
        })
        .catch((error) => {
          seterrorMessage(error.code + "-" + error.message);
        });
    }

    email = useRef("");
    password = useRef("");
  };

  return (
    <>
      <div className="flex items-center justify-between">
        {/* Existing content for Sign In */}
        <div
          className={`left text-center mx-auto w-[30%] ${
            isSignupForm
              ? "transition-transform duration-500 transform translate-x-full w-[45%] pl-48 max-sm:pl-20"
              : ""
          }`}
        >
          <h1 className="text-[25px] font-bold">
            {isSignupForm
              ? "Hello Sir 😎, Please Sign Up"
              : "Heey 👋🏻 ! Please Sign into Your Account "}
          </h1>
          <div className="mt-4">
            <input
              ref={email}
              className="block bg-slate-100 px-2 py-2 w-full"
              type="text"
              placeholder="Email"
            />
            {isSignupForm && (
              <input
                ref={name}
                className="block mt-3 bg-slate-100 px-2 py-2 w-full"
                type="text"
                placeholder="Your Name"
              />
            )}
            {isSignupForm && (
              <input
                ref={registerNumber}
                className="block mt-3 bg-slate-100 px-2 py-2 w-full"
                type="text"
                placeholder="Your Register Number"
              />
            )}
            <input
              ref={password}
              className="block bg-slate-100 px-2 py-2 w-full mt-3"
              type="text"
              placeholder="Password"
            />
            {!isSignupForm && (
              <h1 className="mt-4 hover:underline cursor-pointer">
                Forgot Password ?{" "}
              </h1>
            )}
            <p className="text-red-400">{errorMessage}</p>
            <button
              onClick={handleLoginValidation}
              className="bg-[#512da8] px-2 py-2 mt-4 rounded-md cursor-pointer text-white w-[40%] max-sm:w-full"
            >
              {isSignupForm ? "Sign up" : "Sign in "}
            </button>
          </div>
        </div>

        <div
          className={`right bg-[#512da8] px-5  h-screen w-[50%]  ${
            isSignupForm
              ? "transition-all duration-500 delay-75  transform -translate-x-full rounded-tr-[350px] rounded-br-[350px]"
              : "transition-all duration-500 delay-75 rounded-tl-[350px] rounded-bl-[350px]"
          }`}
        >
          <div className="text-center flex flex-col justify-center h-[100vh] ">
            <h1 className="text-white font-bold text-[50px]">Welcome 😂</h1>
            <p className="text-white tracking-wider ">
              {isSignupForm
                ? "Already user ? Please click to the sign in button 👇"
                : "Register with your personal details ! Please click on Sign up Button 👇 "}
            </p>
            <button
              onClick={() => setIsSignupForm(!isSignupForm)}
              className="mt-3 px-3 cursor-pointer py-3 border w-[30%] max-sm:w-[80%] uppercase font-bold text-white rounded-xl mx-auto "
            >
              {isSignupForm ? "Sign IN" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
