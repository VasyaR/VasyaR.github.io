import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../components/Footer";

describe("Footer", () => {
  it("renders the component", () => {
    render(<Footer />);
    const ads = screen.getAllByAltText("Advertisement");
    expect(ads).toHaveLength(2);
    const headings = screen.getAllByRole("heading", { name: /foooter/i });
    expect(headings).toHaveLength(1);
  });
});
