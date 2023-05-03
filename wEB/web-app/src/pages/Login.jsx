import { useState } from "react";
import { LocalStorage } from "../utils/localStorage";
import { Route, Routes, isRouteErrorResponse } from "react-router";
import { useNavigate } from "react-router-dom";
import { $api } from "../axios/axios-client";
import { SetUser, useAppContext } from "../providers/context";
import { Button, TextField } from "@mui/material";
import Myselect from "../components/Myselect";

const Login = () => {
  const { state, dispatch } = useAppContext();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, SetConfirmPassword] = useState("");
  const [role, setRole] = useState("admin");

  const navigate = useNavigate();

  const LoginUser = async () => {
    if (password !== confirmPassword) {
      return alert("you haven't confirmed your password");
    }

    try {
      const response = await $api.post(`/${role}/login`, {
        login: login,
        password: password,
      });
      dispatch(
        SetUser({
          token: response.data.token,
          role: role,
          isAuth: true,
          username: login,
          id: response.data.id,
        })
      );
      LocalStorage.add("token", response.data.token);
      LocalStorage.add("role", role);
      LocalStorage.add("isAuth", true);
      LocalStorage.add("username", login);
      LocalStorage.add("id", response.data.id);
      navigate("/myaccount");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div style={{ position: "absolute", left: "40%", maxWidth: "30%" }}>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <label htmlFor="login">Login:</label>
        <TextField
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="text"
          id="login"
          name="login"
          onChange={(e) => setLogin(e.target.value)}
          value={login}
        />
        <label htmlFor="password">Password:</label>
        <TextField
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <label htmlFor="confirm-password"> Confirm password:</label>
        <TextField
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="password"
          id="confirm-password"
          name="confirm-password"
          onChange={(e) => SetConfirmPassword(e.target.value)}
          value={confirmPassword}
        />
        <label htmlFor="role">Role:</label>
        <Myselect
          id="role"
          name="role"
          label="Role"
          onChange={(e) => setRole(e.target.value)}
          value={role}
          items={[
            { value: "admin", text: "Admin" },
            { value: "teacher", text: "Teacher" },
            { value: "student", text: "Student" },
          ]}
        ></Myselect>
        <Button
          sx={{ mt: "10px" }}
          variant="contained"
          color="secondary"
          type="submit"
          value="Submit"
          onClick={LoginUser}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
export default Login;
