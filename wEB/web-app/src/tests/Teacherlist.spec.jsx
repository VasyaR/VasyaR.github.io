import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import React from "react";
import Teacherlist from "../pages/Teacherlist";

describe("Teacherlist", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Teacherlist />
      </BrowserRouter>
    );
  });

  it("text test", () => {
    expect(screen.getByText("Teachers")).toBeInTheDocument();
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
