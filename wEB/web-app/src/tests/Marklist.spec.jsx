import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Marklist from "../pages/Marklist";

describe("Marklist", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Marklist />
      </BrowserRouter>
    );
  });

  it("text test", () => {
    expect(screen.getByText("Marks")).toBeInTheDocument();
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
