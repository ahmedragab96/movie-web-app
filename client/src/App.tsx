import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useStores } from "./hooks/useStores";
import { observer } from "mobx-react";
import Login from "./screens/loginScreen";
import MoviesScreen from "./screens/moviesSearchScreen";
import AuthenticationRoute from "./components/AuthenticatedRoute";

const App = observer(() => {
  const { authStore } = useStores();
  console.log('is auth --- ', authStore.accessToken);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthenticationRoute
              authFallbackRoute="/login"
              hasPermission={authStore.isAuthenticated}
            />
          }
        >
          <Route path={"/"} element={<Navigate to={"/movies"} />} />
          <Route path={"/movies"} element={<MoviesScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
});

export default App;
