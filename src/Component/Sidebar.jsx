import React from "react";
import { signOut } from "firebase/auth";
import { RiAdminLine } from "react-icons/ri";
import { BatchSlots, BatchYear } from "../utils/constants";
import { auth } from "../utils/firebase";
import { Link, useParams } from "react-router-dom";

const Sidebar = () => {
  // handle the logout functionality
  const handleLogout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {});
  };
  return (
    <>
      <div className="left w-[15rem] bg-[#2D3047] h-full px-5 py-10">
        <div>
          <div className="adminProfileSection flex space-x-4 ">
            <RiAdminLine className="text-5xl" />
            <div>
              <Link to={"/attendance/profile"}>
                <h1 className=" cursor-pointer ">Abhishek Chaturvedi</h1>
              </Link>
              <h3>(SCSE Professor)</h3>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-xl uppercase tracking-wider font-bold">MCA</h1>
            <ul className="mt-4">
              {BatchYear.map((item) => {
                return (
                  <Link to={`/attendance/students`}>
                    {" "}
                    <li className="cursor-pointer mt-1" key={item.id}>
                      {item.BatchYear} (Batch)
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
          <div className="slots mt-5">
            <h1 className="text-xl uppercase tracking-wider font-bold">
              Slots
            </h1>
            <ul className="mt-4">
              {BatchSlots.map((items) => {
                return (
                  <li key={items.id} className="mt-1 cursor-pointer ">
                    {items.Slots}
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            onClick={handleLogout}
            className="mt-5 capitalize cursor-pointer font-bold text-lg"
          >
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
