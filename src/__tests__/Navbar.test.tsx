//Component test

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

describe("Navbar", () => {
  it("should display Movie the logo", () => {
    render(<Navbar />);
    expect(screen.getByText("Movie")).toBeInTheDocument();
  });
  it("should display Club the logo", () => {
    render(<Navbar />);
    expect(screen.getByText("Club")).toBeInTheDocument();
  });
});
