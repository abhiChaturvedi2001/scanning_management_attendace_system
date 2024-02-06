import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { IoIosLogOut } from "react-icons/io";
import { FaUserFriends } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaUserLock } from "react-icons/fa";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addAccount, logoutUser } from "../utils/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import { addDarkMode } from "../utils/appModeSlice";
import { FaBars } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const Navbar = () => {
  const [togle, setTogle] = useState(false);
  const user = useSelector((store) => store.user);
  const toggle = useSelector((store) => store.appMode.toggle);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
        toast.success("logged out", {
          position: "top-center",
          autoClose: 1000,
        });
        navigate("/");
      }
    });

    // Unsubscribe the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <ToastContainer />
      <FaBars
        className={`text-3xl cursor-pointer my-5 mx-5 ${
          togle ? `hidden` : `block`
        }`}
        onClick={() => setTogle(true)}
      />
      <nav
        className={`bg-[#0B3142] relative  transition-all duration-100 delay-75 text-white ${
          togle ? `w-[25rem] px-5 ` : `w-[0rem] px-0`
        } h-full  py-5`}
      >
        <RxCross1
          onClick={() => setTogle(false)}
          className={`absolute right-2  ${togle ? "block" : "hidden"}`}
        />
        <div className={`px-5 text-center ${togle ? `block` : `hidden`}`}>
          <Link onClick={() => setTogle(false)} to={"/mainPage"}>
            <FaUserLock className="text-6xl w-[50%]  mx-auto  " />
            <h1 className="mt-3 font-bold font-poppins">
              {user === null ? `Hello` : `${user.displayName}`}{" "}
            </h1>
          </Link>
        </div>
        <ul className={`text-lg px-5 mt-5 ${togle ? "block" : "hidden"}`}>
          <Link onClick={() => setTogle(false)} to={"/mainPage/adminProfile"}>
            <li className="flex items-center space-x-2 cursor-pointer">
              <span>
                <FaRegUser className="text-2xl " />
              </span>
              <p
                className=" font-poppins font-bold
             "
              >
                Admin Profile
              </p>
            </li>
          </Link>
          <Link onClick={() => setTogle(false)} to={"/mainPage/Students"}>
            <li className="flex items-center space-x-2 mt-4 cursor-pointer">
              <span>
                <FaUserFriends className="text-2xl" />
              </span>
              <p className="font-bold font-poppins">MCA</p>
            </li>
          </Link>
          <li className="flex items-center space-x-2 mt-4 cursor-pointer">
            <span>
              {!toggle ? (
                <MdDarkMode
                  onClick={() => dispatch(addDarkMode(true))}
                  className="text-2xl"
                />
              ) : (
                <CiLight
                  onClick={() => dispatch(addDarkMode(false))}
                  className="text-2xl"
                />
              )}
            </span>
            <p className="font-bold font-poppins">
              {!toggle ? "Dark Mode" : "Light Mode"}
            </p>
          </li>
          <li
            onClick={handleSignOut}
            className="flex items-center space-x-2 mt-4 cursor-pointer "
          >
            <span>
              <IoIosLogOut className="text-2xl" />
            </span>
            <p className="font-poppins font-bold ">Logout</p>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;
