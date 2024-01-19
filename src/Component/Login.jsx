import React, { useRef, useState, useEffect } from "react";
import { checkValidate } from "../utils/validate";
import { auth } from "../utils/firebase";
import { collection, query, getDocs, where } from "firebase/firestore";
import { db } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, removeUsers } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, seterrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // this is use for taking the input values useRef hooks
  let email = useRef(null);
  let password = useRef(null);

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

  const handleValidation = () => {
    const message = checkValidate(email.current.value, password.current.value);
    seterrorMessage(message);
    if (message != null) return;

    fetchDataFromDB();
  };

  const fetchDataFromDB = async () => {
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
    const { AdminID, AdminPassword, AdminName } = userData;
    createUserWithEmailAndPassword(auth, AdminID, AdminPassword, AdminName)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: AdminName,
        })
          .then(() => {
            const { email, displayName } = auth.currentUser;
            console.log(auth.currentUser);
            dispatch(
              addUsers({
                email: email,
                displayName: displayName,
              })
            );
          })
          .catch((error) => {});
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMessage(`${errorCode} - ${errorMessage}`);
      });

    signInWithEmailAndPassword(auth, AdminID, AdminPassword, AdminName)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user + "sign waala");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        seterrorMessage(`${errorCode} - ${errorMessage}`);
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
            <p className="text-red-500 font-bold">{errorMessage}</p>
            <button
              onClick={handleValidation}
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
