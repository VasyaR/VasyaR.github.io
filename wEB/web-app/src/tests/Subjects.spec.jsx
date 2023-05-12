import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Subjects from "../pages/Subjects";

describe("Subjects", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Subjects />
      </BrowserRouter>
    );
  });

  it("text test", () => {
    expect(screen.getByText("Subjects")).toBeInTheDocument();
  });

  it("Hide left ads test", () => {
    const xLeftBtn = screen.getByTestId("XLeftBtnTestId");
    expect(screen.queryByTestId("LeftBottAdsTestId")).toBeInTheDocument();
    fireEvent.click(xLeftBtn);
    expect(screen.queryByTestId("LeftBottAdsTestId")).not.toBeInTheDocument();
    expect(screen.queryByTestId("XLeftBtnTestId")).not.toBeInTheDocument();
    expect(null).toBeInTheDocument();
  });

  it("Hide right ads test", () => {
    const xRightBtn = screen.getByTestId("XRightBtnTestId");
    expect(screen.queryByTestId("RightBottAdsTestId")).toBeInTheDocument();
    fireEvent.click(xRightBtn);
    expect(screen.queryByTestId("RightBottAdsTestId")).not.toBeInTheDocument();
    expect(screen.queryByTestId("XRightBtnTestId")).not.toBeInTheDocument();
    expect(null).toBeInTheDocument();
  });
});
