import React from "react";
import Login from "./Component/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./Component/Main";
import Profile from "./Component/Profile";
import Students from "./Component/Students";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/mainPage",
      element: <Main />,
      children: [
        {
          path: "/mainPage/adminProfile",
          element: <Profile />,
        },
        {
          path: "/mainPage/Students",
          element: <Students />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};
export default App;
