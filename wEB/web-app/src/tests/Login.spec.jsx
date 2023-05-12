import { beforeEach, describe, expect, it, vitest, vi } from "vitest";
import { act, fireEvent, render, screen } from "@testing-library/react";
import Login from "../pages/Login";
import { BrowserRouter, useNavigate } from "react-router-dom";
import axios from "axios";
import { $api } from "../axios/axios-client";
import { SetUser, useAppContext } from "../providers/context";

describe("Login", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  });

  it("Login text", () => {
    const loginElement = screen.getByText(/Login:/i);
    expect(loginElement).toBeInTheDocument();
  });

  it("Login button", () => {
    const loginElement = screen.getByTestId("LoginBtnTestId");
    expect(loginElement).toBeInTheDocument();
  });

  it("You haven`t confirmed your password test", async () => {
    const LoginPasswordTestId = screen.getByTestId("LoginPasswordTestId");
    vi.spyOn(global, "alert").getMockImplementation();
    fireEvent.input(LoginPasswordTestId, { target: { value: "123" } });
    const loginBtn = screen.getByTestId("LoginBtnTestId");
    fireEvent.click(loginBtn);
    expect(global.alert).toBeCalledTimes(1);
  });

  it("Login axios.post error test", async () => {
    const loginBtn = screen.getByTestId("LoginBtnTestId");
    vi.spyOn(global, "alert").getMockImplementation();
    fireEvent.click(loginBtn);
    await $api.post(`/admin/login`, {
      login: "admin1",
      password: "admin1",
    });
    expect(global.alert).toBeCalledTimes(1);
  });

  it("Login successfull (Admin1) test", async () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: vi.fn(),
        Router: ({ children }) => <div>{children}</div>,
      };
    });

    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);

    const LoginPasswordTestId = screen.getByTestId("LoginPasswordTestId");
    const LoginConfirmPasswordTestId = screen.getByTestId(
      "LoginConfirmPasswordTestId"
    );
    const LoginLoginTestId = screen.getByTestId("LoginLoginTestId");

    act(() => {
      fireEvent.input(LoginLoginTestId, { target: { value: "admin1" } });
      fireEvent.input(LoginPasswordTestId, { target: { value: "admin1" } });
      fireEvent.input(LoginConfirmPasswordTestId, {
        target: { value: "admin1" },
      });

      const loginBtn = screen.getByTestId("LoginBtnTestId");
      fireEvent.click(loginBtn);
    });

    await $api.post(`/admin/login`, {
      login: "admin1",
      password: "admin1",
    });

    expect(navigateMock).toBeCalledTimes(1);
  });
});
