import React, { useEffect } from "react";
import { Outlet, Route, useRoutes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Attendance from "./Component/Attendance";
import Login from "./Component/Login";
import { createBrowserRouter } from "react-router-dom";
import Students from "./Component/Students";
import Profile from "./Component/Profile";

const App = () => {
  return (
    <>
      <div className="app"></div>
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/attendance",
    element: <Attendance />,
    children: [
      {
        path: "/attendance/students",
        element: <Students />,
      },
      {
        path: "/attendance/profile",
        element: <Profile />,
      },
    ],
  },
]);

export default App;
