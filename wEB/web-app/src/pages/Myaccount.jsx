import React, { useState, useRef } from "react";
import { Route, Routes, Link, Navigate, useNavigate } from "react-router-dom";
import { Form } from "../components/Form/Form";
import { LocalStorage } from "../utils/localStorage";
import { $api } from "../axios/axios-client";
import { Button, MenuItem, TextField } from "@mui/material";
import Myselect from "../components/Myselect";

const Myaccount = () => {
  const [isChangePassModalOpen, setChangePassModalOpen] = useState(false);
  const [isDelPassModalOpen, setDelPassModalOpen] = useState(false);
  const [isMarkPassModalOpen, setMarkPassModalOpen] = useState(false);
  const [isPutMarkPassModalOpen, setPutMarkPassModalOpen] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setconfirmNewPassword] = useState("");
  const [delUserId, setDelUserId] = useState(-1);
  const [delRole, setDelRole] = useState("student");
  const [semester, setSemester] = useState(1);
  const [year, setYear] = useState(2022);
  const [putMarkStudentId, setPutMarkStudentId] = useState(-1);
  const [putMarkSubjectId, setPutMarkSubjectId] = useState(-1);
  const [points, setPoints] = useState(50);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [teacehrs, setTeacehrs] = useState([]);
  const [admins, setAdmins] = useState([]);

  const Getstudents = async () => {
    try {
      const response = await $api.get("/student/");
      setStudents(response.data);
      return;
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const Getteachers = async () => {
    try {
      const response = await $api.get("/teacher/");
      setTeacehrs(response.data);
      return;
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const Getadmins = async () => {
    try {
      const response = await $api.get("/admin/");
      setAdmins(response.data);
      return;
    } catch (error) {
      return alert(error.response.data.error);
    }
  };

  const GetSubjetcs = async () => {
    const response = await $api.get("/subject/");
    setSubjects(response.data);
    return;
  };

  const navigate = useNavigate();

  const openChangePassModal = () => {
    setChangePassModalOpen((prev) => !prev);
  };

  const openMarkPassModal = () => {
    setMarkPassModalOpen((prev) => !prev);
  };

  const openPutMarkPassModal = () => {
    setPutMarkPassModalOpen((prev) => !prev);
  };

  const openDelPassModal = () => {
    setDelPassModalOpen((prev) => !prev);
  };

  const PutMark = async () => {
    if (putMarkStudentId <= 0 || putMarkSubjectId <= 0) {
      return alert("choose student and subject");
    }

    if (points < 0) {
      return alert("There should be not less than 0 points");
    }

    if (points > 100) {
      return alert("There should be not more than 100 points");
    }

    try {
      let response = await $api.post(
        `/student/${putMarkStudentId}/subject/${putMarkSubjectId}/points`,
        { year: year, semester: semester, points: points }
      );
      alert("Mark was successfully updated");
      openPutMarkPassModal();
      return;
    } catch (error) {
      alert(error.response.data.message);
      return;
    }
  };

  const ChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("Password confirmation failed");
      setNewPassword("");
      setconfirmNewPassword("");
      return;
    }

    try {
      let response = await $api.post(
        `/${LocalStorage.get("role")}/${LocalStorage.get(
          "id"
        )}/change-password`,
        { password: newPassword }
      );
      setNewPassword("");
      setconfirmNewPassword("");
      openChangePassModal();
      return alert("Password was changed");
    } catch (error) {
      alert(error.response.data.message);
      return;
    }
  };

  const DelUser = async () => {
    if (delUserId === -1) {
      return alert("Choose user");
    }

    try {
      let response = await $api.delete(`/${delRole}/${delUserId}`);
      setDelUserId(null);
      setDelRole("student");
      openDelPassModal();
      alert(`${delRole} was successfully deleted `);
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  if (!LocalStorage.get("isAuth")) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
      }}
    >
      <button
        className="btn btn-primary btn-sm position-fixed corner-btn right-bottom-btn id=change-btn "
        onClick={openChangePassModal}
      >
        Change password
      </button>
      {LocalStorage.get("role") === "admin" ? (
        <button className="btn btn-secondary btn-sm position-fixed corner-btn left-bottom-btn">
          {" "}
          <Link to="/newuser" className="link-btn-txt">
            {" "}
            Add new user{" "}
          </Link>
        </button>
      ) : null}
      {LocalStorage.get("role") === "student" ? (
        <button
          className="btn btn-success btn-sm position-fixed corner-btn left-top-btn"
          onClick={openMarkPassModal}
        >
          {" "}
          My marks{" "}
        </button>
      ) : null}
      {LocalStorage.get("role") === "teacher" ? (
        <button
          className="btn btn-danger btn-sm position-fixed corner-btn right-top-btn id=put-mark-btn"
          onClick={() => {
            openPutMarkPassModal();
            GetSubjetcs();
            Getstudents();
          }}
        >
          Put mark for student
        </button>
      ) : null}

      <div style={{ textAlign: "center", paddingTop: "100px" }}>
        <h1 data-testid="YourUsernameTestId">
          {" "}
          Your username: {LocalStorage.get("username")}
        </h1>
        <h1> role: {LocalStorage.get("role")}</h1>
      </div>

      {LocalStorage.get("role") === "admin" ? (
        <button
          className="btn btn-secondary btn-sm position-fixed link-btn-txt corner-btn left-top-btn"
          onClick={() => {
            openDelPassModal();
            Getstudents();
            Getteachers();
            Getadmins();
          }}
        >
          Delete user
        </button>
      ) : null}

      <Form open={isChangePassModalOpen} openModal={openChangePassModal}>
        <label for="new-pass">New password:</label>
        <TextField
          sx={{ border: 0 }}
          label="Password"
          color="secondary"
          variant="outlined"
          name="newPassword"
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
        />
        <label for="new-pass-repeat">Repeat:</label>
        <TextField
          sx={{ border: 0 }}
          label="Repeat password"
          variant="outlined"
          color="secondary"
          name="confirmNewPassword"
          onChange={(e) => setconfirmNewPassword(e.target.value)}
          value={confirmNewPassword}
        />
        <Button
          sx={{ mt: "10px" }}
          variant="contained"
          color="secondary"
          type="submit"
          onClick={ChangePassword}
        >
          Confirm Change
        </Button>
      </Form>

      <Form id="put-mark-form">
        <label
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          htmlFor="stud-id"
        >
          Student id:
        </label>
        <TextField type="text" id="stud-id" name="stud-id" />
        <label
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          htmlFor="subj-id"
        >
          Subject id:
        </label>
        <TextField type="text" id="subj-id" name="subj-id" />
        <label
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          htmlFor="year"
        >
          Year:
        </label>
        <TextField type="text" id="year" name="year" />
        <label
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          htmlFor="semester"
        >
          Semester:
        </label>
        <TextField type="text" id="semester" name="semester" />
        <label
          sx={{ border: 0 }}
          variant="outlined"
          color="secondary"
          htmlFor="points"
        >
          Points:
        </label>
        <TextField type="text" id="points" name="points" />
        <Button
          sx={{ m: "10px" }}
          variant="contained"
          color="secondary"
          type="submit"
          id="confirm-put-mark-btn"
        >
          Put mark
        </Button>
      </Form>

      {/* Delete form */}
      <Form open={isDelPassModalOpen} openModal={openDelPassModal}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Myselect
            id="delRole"
            name="delRole"
            label="User role"
            onChange={(e) => {
              setDelRole(e.target.value);
              setDelUserId(-1);
            }}
            value={delRole}
            items={[
              { value: "admin", text: "Admin" },
              { value: "teacher", text: "Teacher" },
              { value: "student", text: "Student" },
            ]}
          ></Myselect>
          {delRole === "student" ? (
            <Myselect
              onChange={(e) => setDelUserId(e.target.value)}
              value={delUserId}
              label="User login"
              items={students.map((student) => ({
                text: student.login,
                value: student.id,
              }))}
            />
          ) : null}
          {delRole === "teacher" ? (
            <Myselect
              onChange={(e) => setDelUserId(e.target.value)}
              value={delUserId}
              label="User login"
              items={teacehrs.map((teacher) => ({
                text: teacher.login,
                value: teacher.id,
              }))}
            />
          ) : null}
          {delRole === "admin" ? (
            <Myselect
              onChange={(e) => setDelUserId(e.target.value)}
              value={delUserId}
              label="User login"
              items={admins.map((admin) => ({
                text: admin.login,
                value: admin.id,
              }))}
            />
          ) : null}
          <Button
            sx={{ mt: "10px" }}
            variant="contained"
            color="secondary"
            type="submit"
            id="confirm-del-btn"
            onClick={DelUser}
            style={{ background: "red" }}
          >
            Confirm Delete
          </Button>
        </div>
      </Form>

      {/* My mark form */}
      <Form open={isMarkPassModalOpen} openModal={openMarkPassModal}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Myselect
            id="semester"
            name="semester"
            label="semester"
            onChange={(e) => setSemester(e.target.value)}
            value={semester}
            items={[
              { value: 1, text: 1 },
              { value: 2, text: 2 },
            ]}
          ></Myselect>
          <Myselect
            id="year"
            name="year"
            label="yeay"
            onChange={(e) => setYear(e.target.value)}
            value={year}
            items={[
              { value: 2020, text: 2020 },
              { value: 2021, text: 2021 },
              { value: 2022, text: 2022 },
              { value: 2023, text: 2023 },
            ]}
          ></Myselect>
          <Button
            sx={{ mt: "10px" }}
            variant="contained"
            color="secondary"
            type="submit"
            id="show-mark-btn"
            onClick={() => {
              navigate(`/marklist?semester=${semester}&year=${year}`);
            }}
            style={{ background: "lightgreen", maxWidth: "20%" }}
          >
            Show marks
          </Button>
        </div>
      </Form>

      {/* Put mark from */}
      <Form open={isPutMarkPassModalOpen} openModal={openPutMarkPassModal}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Myselect
            id="semester"
            name="semester"
            label="semester"
            onChange={(e) => setSemester(e.target.value)}
            value={semester}
            items={[
              { value: 1, text: 1 },
              { value: 2, text: 2 },
            ]}
          ></Myselect>

          <Myselect
            id="year"
            name="year"
            label="year"
            onChange={(e) => setYear(e.target.value)}
            value={year}
            items={[
              { value: 2020, text: 2020 },
              { value: 2021, text: 2021 },
              { value: 2022, text: 2022 },
              { value: 2023, text: 2023 },
            ]}
          ></Myselect>

          <Myselect
            id="putMarkStudentId"
            name="putMarkStudentId"
            label="Login"
            onChange={(e) => setPutMarkStudentId(e.target.value)}
            value={putMarkStudentId}
            items={students.map((student) => ({
              text: student.login,
              value: student.id,
            }))}
          ></Myselect>

          <Myselect
            id="putMarkSubjectId"
            name="putMarkSubjectId"
            label="Subject"
            onChange={(e) => setPutMarkSubjectId(e.target.value)}
            value={putMarkSubjectId}
            items={subjects.map((subject) => ({
              text: subject.name,
              value: subject.id,
            }))}
          ></Myselect>
          <TextField
            type="text"
            id="points"
            style={{ maxWidth: "75%", margin: "5px" }}
            name="points"
            onChange={(e) => setPoints(e.target.value)}
            value={points}
          />

          <Button
            sx={{ mt: "10px" }}
            variant="contained"
            color="secondary"
            type="submit"
            id="show-mark-btn"
            onClick={PutMark}
            style={{ background: "lightgreen" }}
          >
            Put Mark
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default Myaccount;
