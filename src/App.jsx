import React from "react";
import Login from "./Component/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./Component/Main";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/mainPage",
      element: <Main />,
    },
  ]);
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};
export default App;
