import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { Form } from "../components/Form/Form";
import { LocalStorage } from "../utils/localStorage";
import { useSearchParams } from "react-router-dom";
import { $api } from "../axios/axios-client";

const Univeristyrating = () => {
  const [query] = useSearchParams();
  const [students, setStudents] = useState([]);
  const [showAdsLeftBottom, setShowAdsLeftBottom] = useState(true);
  const [showAdsRightBottom, setShowAdsRightBottom] = useState(true);

  const GetStudents = async () => {
    try {
      const response = await $api.get(
        `/university/${query.get("universityId")}/rating?semester=${query.get(
          "semester"
        )}&year=${query.get("year")}`
      );
      setStudents(response.data.rating);
      return;
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  useEffect(() => {
    GetStudents();
  }, []);

  return (
    <div>
      <div className="container my-5">
        <h2>Rating</h2>
        <hr />
        <ul className="list-group">
          {students.map((student) => (
            <li
              key={student.student_id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {student.student.first_name} {student.student.last_name}
              <div>
                <p> {student.points} </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
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

export default Univeristyrating;
