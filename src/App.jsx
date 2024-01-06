import React from "react";
import Login from "./Component/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Attendance from "./Component/Attendance";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "",
      element: <Login />,
    },
    {
      path: "/attendance",
      element: <Attendance />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
