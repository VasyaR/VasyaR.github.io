import { useEffect, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import { Form } from "../components/Form/Form";
import { LocalStorage } from "../utils/localStorage";
import { $api } from "../axios/axios-client";
import { Button, TextField } from "@mui/material";
import { green } from "@mui/material/colors";

const Subjects = () => {
  const [isChangePassModalOpen, setChangePassModalOpen] = useState(false);
  const [isDelPassModalOpen, setDelPassModalOpen] = useState(false);
  const [isAddPassModalOpen, setAddPassModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIds, setNewIds] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [teacehrs, setTeacehrs] = useState([]);
  const [showAdsLeftBottom, setShowAdsLeftBottom] = useState(true);
  const [showAdsRightBottom, setShowAdsRightBottom] = useState(true);

  const Getteachers = async () => {
    try {
      const response = await $api.get("/teacher/");
      setTeacehrs(response.data);
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

  useEffect(() => {
    GetSubjetcs();
  }, []);

  const openAddPassModal = () => {
    setAddPassModalOpen((prev) => !prev);
    setNewIds("");
    setNewName("");
  };

  const openDelPassModal = () => {
    setDelPassModalOpen((prev) => !prev);
  };

  const openChangePassModal = () => {
    setChangePassModalOpen((prev) => !prev);
    setNewIds("");
    setNewName("");
  };

  const AddSubject = async () => {
    const refteacherIds = newIds.split(",").map((item) => parseInt(item, 10));

    try {
      const response = await $api.post(`/subject/`, {
        name: newName,
        teacher_ids: refteacherIds,
      });
      alert(`Subject was successfully added`);
      openAddPassModal();
      GetSubjetcs();
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  const DeleteSubject = async () => {
    try {
      const response = await $api.delete(`/subject/${subjectId}`);
      alert(`Subject was successfully deleted`);
      openDelPassModal();
      GetSubjetcs();
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  // parseInt(item, 10)
  const ChangeSubject = async () => {
    let refteacherIds = [];
    const teacherLogins = newIds.split(" ").map((item) => item);

    for (let i = 0; i < teacherLogins.length; i++) {
      let exists = false;
      for (let j = 0; j < teacehrs.length; j++) {
        if (teacherLogins[i] === teacehrs[j].login) {
          refteacherIds.push(teacehrs[i].id);
          exists = true;
          break;
        }
      }
      if (exists === false) {
        return alert("Some of teachers were not found");
      }
    }

    try {
      const response = await $api.post(`/subject/${subjectId}`, {
        name: newName,
        teacher_ids: refteacherIds,
      });
      alert(`Subject was successfully updateded`);
      openChangePassModal();
      setNewIds("");
      setNewName("");
      GetSubjetcs();
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="container my-5">
        <h2>Subjects</h2>
        <hr />
        <ul className="list-group">
          {subjects.map((subject) => (
            <li
              key={subject.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {subject.name}
              <div>
                <button
                  style={{ backgroundColor: "purple" }}
                  className="btn btn-primary btn-sm mr-2"
                >
                  <Link
                    className="link-btn-txt"
                    to={`/teacherlist?teachers=${subject.teacher_ids}`}
                  >
                    Teachers
                  </Link>
                </button>
                {LocalStorage.get("role") === "admin" ? (
                  <button
                    style={{ margin: "5px" }}
                    className="btn btn-primary btn-sm mr-2"
                    onClick={() => {
                      setSubjectId(subject.id);
                      Getteachers();
                      openChangePassModal();
                    }}
                  >
                    Change
                  </button>
                ) : null}
                {LocalStorage.get("role") === "admin" ? (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      setSubjectId(subject.id);
                      openDelPassModal();
                    }}
                  >
                    Delete
                  </button>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* " */}

      <Form
        id="change-form"
        open={isChangePassModalOpen}
        openModal={openChangePassModal}
      >
        <div style={{}}>
          <div
            style={{
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="new-name">New name:</label>
            <TextField
              type="text"
              id="new-name"
              name="new-name"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              value={newName}
            />
            <label htmlFor="new-ids">Enter teachers` logins</label>
            <TextField
              type="text"
              id="new-ids"
              name="new-ids"
              onChange={(e) => setNewIds(e.target.value)}
              value={newIds}
            />
            <Button
              sx={{ mt: "10px" }}
              variant="contained"
              color="success"
              type="submit"
              id="confirm-change-btn"
              onClick={ChangeSubject}
            >
              Confirm Change
            </Button>
          </div>
        </div>
      </Form>

      <Form
        id="delete-form"
        open={isDelPassModalOpen}
        openModal={openDelPassModal}
      >
        <div style={{}}>
          <div
            style={{
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="new-name">Are you sure?</label>
            <Button
              variant="contained"
              color="error"
              type="submit"
              id="delete"
              onClick={DeleteSubject}
            >
              Confirm
            </Button>
            <Button
              sx={{ mt: "10px" }}
              variant="contained"
              color="error"
              type="submit"
              id="don`t delete"
              onClick={openDelPassModal}
            >
              no
            </Button>
          </div>
        </div>
      </Form>

      <Form
        id="add-form"
        open={isAddPassModalOpen}
        openModal={openAddPassModal}
      >
        <div style={{}}>
          <div
            style={{
              justifyContent: "center",
              flexDirection: "column",
              textAlign: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <label htmlFor="addname">Name:</label>
            <TextField
              type="text"
              id="add-name"
              name="add-name"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              value={newName}
            />
            <label htmlFor="add-ids">
              Enter teachers` ids separated by comas:
            </label>
            <TextField
              type="text"
              id="add-ids"
              name="add-ids"
              onChange={(e) => setNewIds(e.target.value)}
              value={newIds}
            />
            <Button
              sx={{ mt: "10px" }}
              variant="contained"
              color="success"
              type="submit"
              id="confirm-add-btn"
              onClick={AddSubject}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Form>

      {LocalStorage.get("role") === "admin" ? (
        <div className="container my-5">
          <div className="text-right">
            <Button
              variant="contained"
              color="success"
              className="btn btn-success"
              type="button"
              id="add-btn"
              onClick={openAddPassModal}
            >
              Add subject
            </Button>
          </div>
        </div>
      ) : null}

      {showAdsLeftBottom ? (
        <div className="left-ads-div">
          <img
            src="../../public/Data/advertisment_adidas3.png"
            alt="Advertisement"
            className="ads"
          />
        </div>
      ) : null}
      {showAdsRightBottom ? (
        <div className="right-ads-div">
          <img
            src=".../../public/Data/advertisment_adidas.png"
            alt="Advertisement"
            className="ads"
          />
        </div>
      ) : null}
      <div>
        {showAdsLeftBottom ? (
          <div data-testid="LeftBottAdsTestId" className="left-bottom-ads-div">
            <img
              src="../../public/Data/advertisment_adidas3.png"
              alt="Advertisement"
              className="ads"
            />
          </div>
        ) : null}
      </div>
      <div>
        {showAdsRightBottom ? (
          <div
            data-testid="RightBottAdsTestId"
            className="right-bottom-ads-div"
          >
            <img
              src="../../public/Data/advertisment_adidas.png"
              alt="Advertisement"
              className="ads"
            />
          </div>
        ) : null}
      </div>
      {showAdsRightBottom ? (
        <button
          data-testid="XRigtBtnTestId"
          style={{
            width: `20px`,
            textAlign: "center",
            padding: "3px",
            position: "fixed",
            right: 0,
            bottom: 0,
            backgroundColor: "red",
            fontWeight: "bold",
            zIndex: 2,
            display: "flex",
          }}
          onClick={() => {
            setShowAdsRightBottom(false);
          }}
        >
          x
        </button>
      ) : null}
      {showAdsLeftBottom ? (
        <button
          data-testid="XLeftBtnTestId"
          style={{
            width: `20px`,
            textAlign: "center",
            padding: "3px",
            position: "fixed",
            left: 0,
            bottom: 0,
            backgroundColor: "red",
            fontWeight: "bold",
            zIndex: 2,
            display: "flex",
          }}
          onClick={() => {
            setShowAdsLeftBottom(false);
          }}
        >
          x
        </button>
      ) : null}
    </div>
  );
};

export default Subjects;
