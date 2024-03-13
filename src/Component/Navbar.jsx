import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { FaUserFriends } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addAccount, logoutUser } from "../utils/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import applogo from "../Assets/applogo.png";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { IoIosQrScanner } from "react-icons/io";
import { RiMenu2Fill } from "react-icons/ri";
const Navbar = () => {
  const [isOpen, setisOpen] = useState(false);
  const [isToggle, setisToggle] = useState(false);
  const user = useSelector((store) => store.user);
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
      <nav
        className={`bg-[#f0f7fe] ${
          isToggle ? `max-md:block` : ` max-md:hidden`
        }  flex flex-col justify-between relative w-[20rem]  transition-all text-black duration-100 delay-75  px-2  h-full  py-5`}
      >
        <div className={`px-5 text-center`}>
          <img src={applogo} alt="" />
        </div>
        <ul className={`text-lg px-5 mt-5 absolute top-[15%] w-full`}>
          <div className="flex space-x-3 items-center font-poppins">
            <FaRegUser className="text-2xl" />
            <div className="font-medium mt-6">
              <p>Dr. {user === null ? "NA" : user.displayName}</p>
              <p>SCSE</p>
            </div>
          </div>
          <Link to={"/mainPage"}>
            <li className="border px-5 w-full font-bold py-2 rounded-md font-poppins mt-6 ">
              Home
            </li>
          </Link>
          <li className="flex justify-between px-5 border items-center py-2 rounded-md font-bold font-poppins mt-3">
            <p>Teams</p>
            {isOpen ? (
              <IoMdArrowDropup
                onClick={() => setisOpen(false)}
                className="cursor-pointer"
              />
            ) : (
              <IoMdArrowDropdown
                onClick={() => setisOpen(true)}
                className="cursor-pointer"
              />
            )}
          </li>
          {isOpen && (
            <div className="border-2 mt-2 transition-all duration-200 rounded-md">
              <Link to={"/mainPage/Students"}>
                <li className="flex space-x-3 mt-4 px-5 cursor-pointer">
                  <span>
                    <FaUserFriends className="text-2xl" />
                  </span>
                  <p className="font-bold font-poppins">MCA</p>
                </li>
              </Link>
              <Link to={"/mainPage/Students"}>
                <li className="flex space-x-3 mt-4 px-5 cursor-pointer">
                  <span>
                    <FaUserFriends className="text-2xl" />
                  </span>
                  <p className="font-bold font-poppins ">B.tech</p>
                </li>
              </Link>
            </div>
          )}
          <Link to={"/mainPage/scanQR"}>
            <li className="border flex justify-between items-center mt-3 px-5 w-full font-bold py-2 rounded-md font-poppins ">
              Scanner{" "}
              <span>
                <IoIosQrScanner />
              </span>
            </li>
          </Link>
        </ul>
        <button
          onClick={handleSignOut}
          className="rounded-md mt-3 w-full px-2 font-bold text-white  py-2 bg-[#1c75d9]  "
        >
          LogOut
        </button>
      </nav>
    </>
  );
};

export default Navbar;
