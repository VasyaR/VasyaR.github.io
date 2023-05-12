import React from "react";
import { render } from "react-dom";
import { act } from "react-dom/test-utils";
import { Portal } from "../components/Portal/Portal";

describe("Portal", () => {
  it("renders children inside a portal", () => {
    const modal = document.createElement("div");
    modal.setAttribute("id", "modal");
    document.body.appendChild(modal);

    const child = <div>Test content</div>;

    act(() => {
      render(<Portal>{child}</Portal>, modal);
    });

    expect(modal.childNodes.length).toBe(1);
    expect(modal.childNodes[0].textContent).toBe("Test content");

    document.body.removeChild(modal);
  });
});
