import { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { Form } from "../components/Form/Form";
import { LocalStorage } from "../utils/localStorage";
import { useSearchParams } from "react-router-dom";
import { $api } from "../axios/axios-client";

const Teacherlist = () => {
  const [teachers, setTeachers] = useState([]);
  const [query] = useSearchParams();
  const [showAdsLeftBottom, setShowAdsLeftBottom] = useState(true);
  const [showAdsRightBottom, setShowAdsRightBottom] = useState(true);

  const GetTeachers = async () => {
    try {
      const response = await Promise.all(
        query
          .get("teachers")
          .split(",")
          .map(
            async (teacherid) => (await $api.get(`/teacher/${teacherid}`)).data
          )
      );
      setTeachers(response);
      return;
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  useEffect(() => {
    GetTeachers();
  }, []);

  return (
    <div>
      <div className="container my-5">
        <h2>Teachers</h2>
        <hr />
        <ul className="list-group">
          {teachers.map((teacher) => (
            <li
              key={teacher.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {teacher.first_name} {teacher.last_name}
              <div></div>
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
            src="../../public/Data/advertisment_adidas.png"
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
          data-testid="XRightBtnTestId"
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

export default Teacherlist;
