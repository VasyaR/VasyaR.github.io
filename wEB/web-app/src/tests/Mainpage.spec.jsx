import { describe, expect, it, vi } from "vitest";
import App from "../App";
import { BrowserRouter } from "react-router-dom";
import { useState } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Mainpage from "../pages/Mainpage";

describe("Mainpage", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Mainpage />
      </BrowserRouter>
    );
  });

  it("Rickroll button exists test", () => {
    const rickRollBtn = screen.getByTestId("RickRollBtnTestId");
    expect(rickRollBtn).toBeInTheDocument();
  });

  it("Close ads works test", () => {
    const xMainPageBtnTestId = screen.getByTestId("xMainPageBtnTestId");
    fireEvent.click(xMainPageBtnTestId);
    expect(screen.queryByTestId("MainPageAdsTestId")).not.toBeInTheDocument();
  });
});
