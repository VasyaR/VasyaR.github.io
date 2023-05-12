import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Univeristyrating from "../pages/Universityrating";

describe("Universities", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Univeristyrating />
      </BrowserRouter>
    );
  });

  it("text test", () => {
    expect(screen.getByText("Rating")).toBeInTheDocument();
  });

  it("Hide left ads test", () => {
    const xLeftBtn = screen.getByTestId("XLeftBtnTestId");
    fireEvent.click(xLeftBtn);
    expect(screen.queryByTestId("LeftBottAdsTestId")).not.toBeInTheDocument();
  });

  it("Hide right ads test", () => {
    const xRightBtn = screen.getByTestId("XRightBtnTestId");
    fireEvent.click(xRightBtn);
    expect(screen.queryByTestId("RightBottAdsTestId")).not.toBeInTheDocument();
  });
});
