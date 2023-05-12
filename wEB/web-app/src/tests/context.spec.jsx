import { createContext, useContext } from "react";
import { render } from "@testing-library/react";
import { Provider, SetUser, RemoveUser } from "../providers/context";
import { vi } from "vitest";

describe("AppContext", () => {
  const initialState = {
    username: "test",
    role: "admin",
    token: "abc123",
    isAuth: true,
    id: 1,
  };

  const TestComponent = () => {
    const { state, dispatch } = useContext(createContext(initialState));
    return (
      <div>
        <p>Username: {state.username}</p>
        <p>Role: {state.role}</p>
        <p>Token: {state.token}</p>
        <p>isAuth: {state.isAuth}</p>
        <p>ID: {state.id}</p>
        <button onClick={() => dispatch(RemoveUser())}>Remove User</button>
      </div>
    );
  };

  it("should render the Provider component with the initial state", () => {
    const { getByText } = render(
      <Provider>
        <TestComponent />
      </Provider>
    );
    expect(getByText("Username: test")).toBeInTheDocument();
    expect(getByText("Role: admin")).toBeInTheDocument();
    expect(getByText("Token: abc123")).toBeInTheDocument();
    expect(getByText("isAuth: true")).toBeInTheDocument();
    expect(getByText("ID: 1")).toBeInTheDocument();
  });

  describe("reducer function", () => {
    it("should update the state correctly for SET_USER action", () => {
      const action = SetUser({
        username: "newuser",
        role: "user",
        token: "def456",
        isAuth: true,
        id: 2,
      });
      const newState = reducer(initialState, action);
      expect(newState.username).toBe("newuser");
      expect(newState.role).toBe("user");
      expect(newState.token).toBe("def456");
      expect(newState.isAuth).toBe(true);
      expect(newState.id).toBe(2);
    });

    it("should update the state correctly for REMOVE_USER action", () => {
      const action = RemoveUser();
      const newState = reducer(initialState, action);
      expect(newState.username).toBeNull();
      expect(newState.role).toBeNull();
      expect(newState.token).toBeNull();
      expect(newState.isAuth).toBe(false);
      expect(newState.id).toBeNull();
    });
  });

  describe("SetUser action", () => {
    it("should set the user correctly", () => {
      const dispatch = vi.fn();
      const username = "testuser";
      const role = "admin";
      const token = "testtoken";
      const isAuth = true;
      const id = 1;
      SetUser({ username, role, token, isAuth, id })(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        type: "SET_USER",
        payload: { username, role, token, isAuth, id },
      });
    });
  });
});
