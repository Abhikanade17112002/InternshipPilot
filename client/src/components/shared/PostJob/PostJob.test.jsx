
/// <reference types="vitest" />
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import PostJob from "./PostJob";
import store from "@/store/store";

// Mocking Loader
vi.mock("../Loader/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

// Mocking companySlice
vi.mock("@/store/store/companySlice/companySlice", () => ({
  getAllCompanies: () => [
    {
      _id: "1",
      companyName: "Test Company",
    },
  ],
}));

describe("PostJob Component", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PostJob />
        </BrowserRouter>
      </Provider>
    );
  });

  it("renders form title correctly", () => {
    expect(screen.getByText(/Fill Job Details/i)).toBeInTheDocument();
  });

  it("renders all required input fields", () => {
    expect(screen.getByPlaceholderText(/Enter Job Title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Job Description/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Requirements/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Salary In LPA/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Enter Job Location/i)).toBeInTheDocument();
  });

  it("renders Post button", () => {
    expect(
      screen.getByRole('button', { name: /Post/i })
    ).toBeInTheDocument();
  });

  it("renders company dropdown", () => {
    // Get the form label specifically
    const labels = screen.getAllByText(/Select Company For Job/i);
    const formLabel = labels.find(label => label.tagName.toLowerCase() === 'label');
    expect(formLabel).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    fireEvent.click(
      screen.getByRole('button', { name: /Post/i })
    );

    await waitFor(() => {
      expect(screen.getByText(/job title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/job description is required/i)).toBeInTheDocument();
    });
  });
});