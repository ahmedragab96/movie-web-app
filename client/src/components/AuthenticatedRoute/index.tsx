import React, { Component } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
  hasPermission: boolean;
  authFallbackRoute: string;
}

class AuthenticationRoute extends Component<Props> {
  render() {
    const {
      hasPermission,
      authFallbackRoute,
    } = this.props;
    if (!hasPermission) {
      return <Navigate to={`${authFallbackRoute}`} />;
    }
    return <Outlet />;
  }
}

export default AuthenticationRoute;
