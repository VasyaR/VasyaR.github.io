import { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import { Form } from "../components/Form/Form";
import { LocalStorage } from "../utils/localStorage";
import { $api } from "../axios/axios-client";
import { Button, TextField } from "@mui/material";
import Myselect from "../components/Myselect";

const Universities = () => {
  const [universities, setUniversities] = useState([]);
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [isChangePassModalOpen, setChangePassModalOpen] = useState(false);
  const [isRatingPassModalOpen, setRatingPassModalOpen] = useState(false);
  const [isDelPassModalOpen, setDelPassModalOpen] = useState(false);
  const [isAddPassModalOpen, setAddPassModalOpen] = useState(false);
  const [semester, setSemester] = useState(1);
  const [year, setYear] = useState(2022);
  const [showAdsLeftBottom, setShowAdsLeftBottom] = useState(true);
  const [showAdsRightBottom, setShowAdsRightBottom] = useState(true);

  const navigate = useNavigate();

  const GetUniversities = async () => {
    const response = await $api.get("/university/");
    setUniversities(response.data);
    return;
  };

  useEffect(() => {
    GetUniversities();
  }, []);

  const openAddPassModal = () => {
    setAddPassModalOpen((prev) => !prev);
    setNewName("");
    setNewAddress("");
  };

  const openDelPassModal = () => {
    setDelPassModalOpen((prev) => !prev);
  };

  const openRatingPassModal = () => {
    setRatingPassModalOpen((prev) => !prev);
  };

  const openChangePassModal = () => {
    setChangePassModalOpen((prev) => !prev);
    setNewName("");
    setNewAddress("");
  };

  const DeleteUniversity = async () => {
    try {
      const response = await $api.delete(`/university/${universityId}`);
      alert(`University was successfully deleted`);
      openDelPassModal();
      GetUniversities();
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  const AddUniversity = async () => {
    try {
      const response = await $api.post(`/university/`, {
        name: newName,
        address: newAddress,
      });
      alert(`University was successfully added`);
      openAddPassModal();
      GetUniversities();
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  const ChangeUniversity = async () => {
    try {
      const response = await $api.post(`/university/${universityId}`, {
        name: newName,
        address: newAddress,
      });
      alert(`University was successfully updateded`);
      openChangePassModal();
      GetUniversities();
    } catch (error) {
      console.log(error);
      return alert(error.response.data.message);
    }
  };

  return (
    <div>
      <div className="container my-5">
        <h2>Universities</h2>
        <hr />
        <ul className="list-group">
          {universities.map((university) => (
            <li
              key={university.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {university.name}
              <div style={{ display: "flex" }}>
                <button
                  style={{ backgroundColor: "purple" }}
                  className="btn btn-primary btn-sm mr-3"
                  onClick={() => {
                    openRatingPassModal();
                    setUniversityId(university.id);
                  }}
                >
                  Rating
                </button>
                {LocalStorage.get("role") === "admin" ? (
                  <button
                    style={{ marginLeft: "5px", marginRight: "5px" }}
                    className="btn btn-primary btn-sm mr-2"
                    id="change-btn"
                    onClick={() => {
                      setUniversityId(university.id);
                      openChangePassModal();
                    }}
                  >
                    Change
                  </button>
                ) : null}
                {LocalStorage.get("role") === "admin" ? (
                  <button
                    className="btn btn-danger btn-sm"
                    id="delete-btn"
                    onClick={() => {
                      setUniversityId(university.id);
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
            <label for="new-name">New Name:</label>
            <TextField
              sx={{ border: 0 }}
              variant="outlined"
              color="secondary"
              type="text"
              id="new-name"
              name="new-name"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              value={newName}
            />
            <label htmlFor="add-address">Address:</label>
            <TextField
              sx={{ border: 0 }}
              variant="outlined"
              color="secondary"
              type="text"
              id="add-address"
              name="add-address"
              onChange={(e) => {
                setNewAddress(e.target.value);
              }}
              value={newAddress}
            />
            <Button
              sx={{ mt: "10px" }}
              variant="contained"
              color="success"
              type="submit"
              id="confirm-change-btn"
              onClick={ChangeUniversity}
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
            <label htmlFor="submit-delete">Are you sure?</label>
            <Button
              sx={{ mt: "10px" }}
              variant="contained"
              color="error"
              type="submit"
              id="delete"
              onClick={DeleteUniversity}
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
            <label htmlFor="add-name">Name:</label>
            <TextField
              sx={{ border: 0 }}
              variant="outlined"
              color="secondary"
              type="text"
              id="add-name"
              name="add-name"
              onChange={(e) => {
                setNewName(e.target.value);
              }}
              value={newName}
            />
            <label htmlFor="add-address">Address:</label>
            <TextField
              sx={{ border: 0 }}
              variant="outlined"
              color="secondary"
              type="text"
              id="add-address"
              name="add-address"
              onChange={(e) => {
                setNewAddress(e.target.value);
              }}
              value={newAddress}
            />
            <Button
              sx={{ mt: "10px" }}
              variant="contained"
              color="success"
              type="submit"
              id="confirm-change-btn"
              onClick={AddUniversity}
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
              type="Button"
              id="add-btn"
              onClick={openAddPassModal}
            >
              Add university
            </Button>
          </div>
        </div>
      ) : null}
      {/* Rating form */}
      <Form open={isRatingPassModalOpen} openModal={openRatingPassModal}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Myselect
            style={{ margin: "5px" }}
            id="semester"
            name="semester"
            label="Semester"
            onChange={(e) => setSemester(e.target.value)}
            value={semester}
            items={[
              { value: 1, text: 1 },
              { value: 2, text: 2 },
            ]}
          ></Myselect>
          <Myselect
            style={{
              margin: "5px",
              marginLeft: "10px",
              marginRight: "10px",
              minWidth: "70px",
            }}
            id="year"
            name="year"
            label="Year"
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
            color="success"
            type="submit"
            id="confirm-change-btn"
            onClick={() => {
              navigate(
                `/universityrating?semester=${semester}&year=${year}&universityId=${universityId}`
              );
            }}
          >
            Show Rating
          </Button>
        </div>
      </Form>
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
            src="../../public/Data/advertisment_adidas.png"
            alt="Advertisement"
            className="ads"
          />
        </div>
      ) : null}
      <div>
        {showAdsLeftBottom ? (
          <div className="left-bottom-ads-div">
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
          <div className="right-bottom-ads-div">
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

export default Universities;
