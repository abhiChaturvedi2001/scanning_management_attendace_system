import React, { useRef } from "react";
import { auth, db } from "../utils/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const ChangePassword = () => {
  const changePassword = useRef(null);

  const handleChangePassword = () => {};

  return (
    <>
      <div className="w-[30rem] bg-[#f0f7fe] py-5 px-5 shadow-lg absolute top-1/2 h-[30vh] left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <label className="font-bold font-poppins">Change Password : </label>
        <input
          className="block w-full px-2 py-2 mt-2 rounded-lg overflow-hidden outline-none
               bg-gray-100 shadow-md"
          type="password"
          ref={changePassword}
        />
        <button
          onClick={handleChangePassword}
          className="mt-5 bg-[#0074D9] rounded-lg overflow-hidden shadow-lg w-full text-white font-poppins font-bold py-4 cursor-pointer"
        >
          Change Password
        </button>
        <Link to={"/"}>
          <p className="mt-4 font-poppins">Back to Home &rarr;</p>
        </Link>
      </div>
    </>
  );
};

export default ChangePassword;
