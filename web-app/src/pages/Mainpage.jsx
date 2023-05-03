import { useState } from "react";
import { Route, Routes } from "react-router";
import { LocalStorage } from "../utils/localStorage";

const Mainpage = () => {
  const [showAdsRightBottom, setShowAdsRightBottom] = useState(true);

  return (
    <div>
      <button className="rick-roll-button">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          Check best students!!!
        </a>
      </button>
      {showAdsRightBottom ? (
        <footer className="bottom-ads-div">
          <img
            src="../../public/Data/advertisment_adidas3.png"
            alt="Advertisement"
            className="ads"
          />
        </footer>
      ) : null}
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
    </div>
  );
};
export default Mainpage;
