import React from "react";
import Login from "./Component/Login";
import { createBrowserRouter } from "react-router-dom";
import Attendance from "./Component/Attendance";
import Body from "./Component/Body";
import { Provider } from "react-redux";
import { store } from "./utils/store";

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
      <Provider store={store}>
        <Body appRouter={appRouter} />
      </Provider>
    </div>
  );
};

export default App;
