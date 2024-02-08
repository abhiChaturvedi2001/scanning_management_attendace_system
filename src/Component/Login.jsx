import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../utils/firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { addAccount, logoutUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { checkValidate } from "../utils/validate";
import appLogo from "../Assets/applogo.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, Employee, AdminContact, Teacher } =
          auth.currentUser;
        dispatch(
          addAccount({
            uid: uid,
            email: email,
            displayName: displayName,
            employee: Employee,
            phone: AdminContact,
            role: Teacher,
          })
        );
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
    setErrorMessage(message);
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
    const {
      AdminID,
      AdminPassword,
      AdminName,
      Employee,
      AdminContact,
      Teacher,
    } = userData;

    signInWithEmailAndPassword(auth, AdminID, AdminPassword)
      .then((userCredential) => {
        const user = userCredential.user;

        // Update the display name
        updateProfile(user, {
          displayName: AdminName,
        })
          .then(() => {
            dispatch(
              addAccount({
                uid: user.uid,
                email: AdminID,
                displayName: AdminName,
                employee: Employee,
                phone: AdminContact,
                role: Teacher,
              })
            );
          })
          .catch((error) => {
            console.error("Error updating profile:", error.message);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(`${errorCode} - ${errorMessage}`);
      });
    toast.success("Successfully Logged In", {
      position: "top-center",
      autoClose: 4000,
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute bg-[#f0f7fe] top-1/2 w-[30rem] max-sm:w-[90%] shadow-lg  h-[80vh] px-9 py-9 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2">
        <img src={appLogo} alt="" />
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
          <Link to={"/forgotPassword"}>
            <p className="font-medium mt-4 hover:underline cursor-pointer font-poppins">
              Forgot your password ?{" "}
            </p>
          </Link>
          <button
            onClick={handleValidation}
            className="mt-[70px] bg-[#0074D9] rounded-lg overflow-hidden shadow-lg w-full text-white font-poppins font-bold py-4 cursor-pointer"
          >
            Login
          </button>
          <p className="text-center mt-4 font-medium font-poppins">
            {errorMessage}
          </p>
          <p className="text-center mt-4 font-medium font-poppins">
            By logging in, you will be accepting terms and conditions of
            AttendMark
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
