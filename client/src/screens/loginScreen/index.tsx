import React, { useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "../../hooks/useStores";
import { useNavigate } from 'react-router-dom';
import "./styles.css";

const Login = observer(() => {
  const { authStore } = useStores();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const login = async () => {
    await authStore.login(username, password);
    navigate('/movies');
  };

  return (
    <div className="container">
      <div className="loginCard">
        <p> Welcome to OMDB </p>
        <input
          className="textInput"
          placeholder="username"
          type={"text"}
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <input
          className="textInput"
          placeholder="password"
          type={"password"}
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <button className="loginButton" onClick={login}> Login </button>
      </div>
    </div>
  );
});

export default Login;
