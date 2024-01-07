import React, { useRef, useState, useEffect } from "react";
import { checkValidate } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUsers, removeUsers } from "../utils/userSlice";

const Login = () => {
  const [isSignupForm, setIsSignupForm] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  let email = useRef(null);
  let password = useRef(null);
  let registerNumber = useRef(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUsers({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/attendance");
      } else {
        dispatch(removeUsers());
        navigate("/");
      }
    });
  }, []);

  const handleLoginValidation = () => {
    const message = checkValidate(
      email.current.value,
      password.current.value,
      registerNumber.current.value
    );
    seterrorMessage(message);
    if (message) return;

    if (isSignupForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          updateProfile(auth.currentUser, {
            displayName: name.current.value,
            registerNumber: registerNumber.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // it takes modify profile and update the current user profile
              const { uid, email, displayName, photoURL, registerNumber } =
                auth.currentUser;
              dispatch(
                addUsers({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                  registerNumber: registerNumber,
                })
              );
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });
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
        })
        .catch((error) => {
          seterrorMessage(error.code + "-" + error.message);
        });
    }
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
              className="block bg-slate-100 px-3 py-3 w-full rounded-md"
              type="text"
              placeholder="example@gmail.com"
            />
            {isSignupForm && (
              <input
                ref={name}
                className="block mt-3 bg-slate-100 px-3 py-3 rounded-md w-full"
                type="text"
                placeholder="Admin Name"
              />
            )}
            {isSignupForm && (
              <input
                ref={registerNumber}
                className="block mt-3 bg-slate-100 px-3 py-3 rounded-md w-full"
                type="text"
                placeholder="Admin Registration Number"
              />
            )}
            <input
              ref={password}
              className="block bg-slate-100 rounded-md px-3 py-3 w-full mt-3"
              type="text"
              placeholder="ex:Pass@123"
            />
            {!isSignupForm && (
              <h1 className="mt-4 hover:underline cursor-pointer">
                Forgot Password ?{" "}
              </h1>
            )}
            <p className="text-red-500 font-bold">{errorMessage}</p>
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
