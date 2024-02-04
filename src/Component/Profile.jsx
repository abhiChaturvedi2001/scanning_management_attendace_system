import React from "react";
import { profile_logo } from "../utils/constant";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    <>
      <div className="flex justify-center items-center px-5 h-[60vh] w-[70rem] mx-auto text-center">
        <div>
          <img className="w-[20%] mx-auto " src={profile_logo} alt="" />
          <div className="font-bold font-poppins">
            <h1>{user === null ? "N/A" : `${user.displayName}`}</h1>
            <h1>Employee : {user === null ? "N/A" : `${user.employee}`} </h1>
          </div>
          <div className="bg-gray-100 h-[20vh] w-full mt-10 shadow-md font-medium font-poppins">
            <div className="pt-5">
              <p>Role : {user === null ? "N/A" : `${user.role}`}</p>
              <p className="mt-2">
                Email : {user === null ? "example@1234.com" : `${user.email}`}
              </p>
              <p className="mt-2">
                {" "}
                Phone : {user === null ? "123456678" : `${user.phone}`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
