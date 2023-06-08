import { useEffect, useState } from "react";
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
  const [subjects, setSubjects] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [role, SetRole] = useState("admin");
  const [universityId, SetUniversityId] = useState("");

  const navigate = useNavigate();

  const GetUniversities = async () => {
    const response = await $api.get("/university/");
    setUniversities(response.data);
    return;
  };

  useEffect(() => {
    GetUniversities();
  }, []);

  const GetSubjetcs = async () => {
    const response = await $api.get("/subject/");
    setSubjects(response.data);
    return;
  };

  useEffect(() => {
    GetSubjetcs();
  }, []);

  const AddUser = async () => {
    if (password !== confirmpassword) {
      alert("Password confirmation failed");
      SetPassword("");
      SetConfirmPassword("");
      return;
    }

    let refUniversityId;
    console.log();
    if (role === "admin" && universityId === "") {
    } else {
      for (let i = 0; i < 1; i++) {
        let exists = false;
        for (let j = 0; j < universities.length; j++) {
          if (universityId === universities[j].name) {
            refUniversityId = universities[j].id;
            exists = true;
            break;
          }
        }
        if (exists === false) {
          return alert("University wasn`t found");
        }
      }
    }
    let refsubjectIds = [];
    const subjectnames = subjectIds.split(" ").map((item) => item);

    if (subjectIds === "") {
    } else {
      for (let i = 0; i < subjectnames.length; i++) {
        let exists = false;
        for (let j = 0; j < subjects.length; j++) {
          if (subjectnames[i] === subjects[j].name) {
            refsubjectIds.push(subjects[j].id);
            exists = true;
            break;
          }
        }
        if (exists === false) {
          return alert("Some of subjects were not found");
        }
      }
    }

    // const refsubjectIds = subjectIds
    //   .split(",")
    //   .map((item) => parseInt(item, 10));
    try {
      const response = await $api.post(`${role}/`, {
        login: login,
        password: password,
        info: {
          first_name: firstname,
          last_name: lastname,
          subject_ids: refsubjectIds,
          university_id: refUniversityId,
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
          inputProps={{ "data-testid": "NewUserLoginTestId" }}
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
          inputProps={{ "data-testid": "NewUserPasswordTestId" }}
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
          inputProps={{ "data-testid": "NewUserConfirmPasswordTestId" }}
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
          inputProps={{ "data-testid": "NewUserFirstNameTestId" }}
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
          inputProps={{ "data-testid": "NewUserLastNameTestId" }}
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="text"
          id="lastname"
          name="lastname"
          onChange={(e) => SetLastName(e.target.value)}
          value={lastname}
        />
        <label htmlFor="university-id"> University:</label>
        <TextField
          inputProps={{ "data-testid": "NewUserUniversityTestId" }}
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          type="text"
          id="university-id"
          name="university-id"
          onChange={(e) => SetUniversityId(e.target.value)}
          value={universityId}
        />
        <label htmlFor="subjects">Subjects that teacher teachs:</label>
        <TextField
          inputProps={{ "data-testid": "NewUserSubjectsTestId" }}
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
          data-testid="NewUserSelectTestId"
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
          data-testid="NewUserBtnTestId"
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
