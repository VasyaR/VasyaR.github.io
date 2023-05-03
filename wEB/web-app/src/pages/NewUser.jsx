import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { Form } from "../components/Form/Form";
import { Navigate } from "react-router-dom";
import { LocalStorage } from "../utils/localStorage";
import { $api } from "../axios/axios-client";
import { Button, TextField } from "@mui/material";
import Myselect from "../components/Myselect";

const NewUser = () => {
  const [login, SetLogin] = useState("");
  const [password, SetPassword] = useState("");
  const [confirmpassword, SetConfirmPassword] = useState("");
  const [firstname, SetFirstName] = useState("");
  const [lastname, SetLastName] = useState("");
  const [subjectIds, SetSubjectIds] = useState("");
  const [role, SetRole] = useState("admin");
  const [universityId, SetUniversityId] = useState("");

  const navigate = useNavigate();

  const AddUser = async () => {
    if (password !== confirmpassword) {
      alert("Password confirmation failed");
      SetPassword("");
      SetConfirmPassword("");
      return;
    }

    const refsubjectIds = subjectIds
      .split(",")
      .map((item) => parseInt(item, 10));
    try {
      const response = await $api.post(`${role}/`, {
        login: login,
        password: password,
        info: {
          first_name: firstname,
          last_name: lastname,
          subject_ids: refsubjectIds,
          university_id: universityId,
        },
      });
      navigate("/myaccount");
      alert(`${role} was successfully created `);
    } catch (error) {
      return alert(error.response.data.message);
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
          onChange={(e) => SetLogin(e.target.value)}
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
          onChange={(e) => SetPassword(e.target.value)}
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
          value={confirmpassword}
        />
        <label htmlFor="firstname">First name:</label>
        <TextField
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="text"
          id="firstname"
          name="first-name"
          onChange={(e) => SetFirstName(e.target.value)}
          value={firstname}
        />
        <label htmlFor="lastname">Last name:</label>
        <TextField
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="text"
          id="lastname"
          name="lastname"
          onChange={(e) => SetLastName(e.target.value)}
          value={lastname}
        />
        <label htmlFor="university-id"> University id:</label>
        <TextField
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="text"
          id="university-id"
          name="university-id"
          onChange={(e) => SetUniversityId(e.target.value)}
          value={universityId}
        />
        <label htmlFor="subjects">Subject ids` separated by comas:</label>
        <TextField
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="text"
          id="subjects"
          name="subjects"
          onChange={(e) => SetSubjectIds(e.target.value)}
          value={subjectIds}
        />
        <label htmlFor="role">Role:</label>
        <Myselect
          id="role"
          name="role"
          label="Role"
          onChange={(e) => SetRole(e.target.value)}
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
          onClick={AddUser}
        >
          Create new user
        </Button>
      </div>
    </div>
  );
};
export default NewUser;
