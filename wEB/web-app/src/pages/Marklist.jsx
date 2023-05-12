import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import { LocalStorage } from "../utils/localStorage";
import { $api } from "../axios/axios-client";
import { useAppContext } from "../providers/context";
import { useSearchParams } from "react-router-dom";

const Marklist = () => {
  const [marks, setMarks] = useState([]);
  const [query] = useSearchParams();
  const [showAdsLeftBottom, setShowAdsLeftBottom] = useState(true);
  const [showAdsRightBottom, setShowAdsRightBottom] = useState(true);

  const GetMarks = async () => {
    try {
      const response = await $api.get(
        `/student/${LocalStorage.get("id")}/rating?semester=${query.get(
          "semester"
        )}&year=${query.get("year")}`
      );
      setMarks(response.data.subjects);
      return;
    } catch (error) {
      return alert(error.response.data.message);
    }
  };

  useEffect(() => {
    GetMarks();
  }, []);

  return (
    <div>
      <div className="container my-5">
        <h2>Marks</h2>
        <hr />
        <ul className="list-group">
          {marks.map((mark) => (
            <li
              key={mark.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {mark.subject}
              <div>
                <p> {mark.points} </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {showAdsLeftBottom ? (
        <div data-testid="LeftBottAdsTestId" className="left-ads-div">
          <img
            src="../../public/Data/advertisment_adidas3.png"
            alt="Advertisement"
            className="ads"
          />
        </div>
      ) : null}
      {showAdsRightBottom ? (
        <div data-testid="RightBottAdsTestId" className="right-ads-div">
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

export default Marklist;
