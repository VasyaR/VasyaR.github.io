import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import NewUser, { GetUniversities } from "../pages/NewUser";
import React from "react";

describe("NewUser", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <NewUser />
      </BrowserRouter>
    );
  });

  it("Incorrect password test", async () => {
    const newUserPasswordTestId = screen.getByTestId("NewUserPasswordTestId");
    vi.spyOn(global, "alert").getMockImplementation();
    fireEvent.input(newUserPasswordTestId, { target: { value: "123" } });
    const newUserBtn = screen.getByTestId("NewUserBtnTestId");
    fireEvent.click(newUserBtn);
    expect(global.alert).toBeCalledTimes(1);
  });

  it("Incorrect university test", async () => {
    const select = screen.getByTestId("NewUserSelectTestId");
    fireEvent.change(select, { target: { value: "teacher" } });
    const lastName = screen.getByText("Last name:");
    screen.debug(undefined, 300000);
    const universuty = screen.getByTestId("NewUserUniversityTestId");
    fireEvent.input(universuty, { target: { value: "NowExistingUniversity" } });

    // const newUserBtn = screen.getByTestId("NewUserBtnTestId");
    // fireEvent.click(newUserBtn);
    // expect(global.alert).toBeCalledTimes(1);
  });
});
