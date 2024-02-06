import React from "react";
import Login from "./Component/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./Component/Main";
import Profile from "./Component/Profile";
import Students from "./Component/Students";
import About from "./Component/About";
import DataDisplay from "./Component/DataDisplay";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/display/:data",
      element: ({ match }) => <DataDisplay data={match.params.data} />,
    },
    {
      path: "/mainPage",
      element: <Main />,
      children: [
        {
          path: "/mainPage",
          element: <About />,
        },
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
