import { LocalStorage } from "../utils/localStorage";

describe("LocalStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("get returns null if key does not exist", () => {
    expect(LocalStorage.get("non-existent-key")).toBeNull();
  });

  it("add stores value in localStorage", () => {
    LocalStorage.add("test-key", "test-value");

    expect(localStorage.getItem("test-key")).toBe(JSON.stringify("test-value"));
  });

  it("get returns value stored in localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("test-value"));

    expect(LocalStorage.get("test-key")).toBe("test-value");
  });

  it("remove deletes value from localStorage", () => {
    localStorage.setItem("test-key", JSON.stringify("test-value"));

    LocalStorage.remove("test-key");

    expect(localStorage.getItem("test-key")).toBeNull();
  });
});
