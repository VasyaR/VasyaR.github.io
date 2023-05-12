import axios from "axios";
import { LocalStorage } from "../utils/localStorage";
import { RemoveUser } from "../providers/context";
import { $api } from "../axios/axios-client";
import { vi } from "vitest";

vi.mock("axios");

describe("API interceptor tests", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("Intercepts 401 error and removes user data from local storage", async () => {
    const originalRequest = {
      method: "get",
      url: "/test",
    };

    const error = {
      response: {
        status: 401,
      },
      config: originalRequest,
    };

    const removeUserMock = vi.spyOn(RemoveUser, "mockImplementation");

    LocalStorage.add("token", "invalid_token");

    axios.create.mockReturnValueOnce({
      request: vi.fn(),
      interceptors: {
        request: {
          use: vi.fn(),
        },
        response: {
          use: vi.fn(),
        },
      },
    });

    await expect($api.request(originalRequest)).rejects.toEqual(error);

    expect(removeUserMock).toHaveBeenCalled();
    expect(LocalStorage.get("id")).toBeNull();
    expect(LocalStorage.get("role")).toBeNull();
    expect(LocalStorage.get("username")).toBeNull();
    expect(LocalStorage.get("token")).toBeNull();
    expect(LocalStorage.get("isAuth")).toBeFalsy();
  });
});
