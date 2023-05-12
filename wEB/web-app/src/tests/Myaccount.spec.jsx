import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Myaccount from "../pages/Myaccount";

describe("Myaccount", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Myaccount />
      </BrowserRouter>
    );
  });

  it("1", () => {
    expect(1).toBe(1);
  });
});
