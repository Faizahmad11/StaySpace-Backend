import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, role, ...rest }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!user) {
          // Not logged in
          return <Redirect to="/signin" />;
        } else if (role && user.role !== role) {
          // Wrong role
          return <Redirect to="/signin" />;
        } else {
          // Authorized
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
