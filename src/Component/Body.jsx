import React from "react";
import { RouterProvider } from "react-router-dom";

const Body = ({ appRouter }) => {
  return <RouterProvider router={appRouter} />;
};

export default Body;
