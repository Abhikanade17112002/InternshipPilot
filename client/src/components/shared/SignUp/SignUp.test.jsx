import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SignUp from "./SignUp";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // update path if needed
import { vi } from "vitest";
import store from "@/store/store";

// Mock toast
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock Redux action
vi.mock("@/store/store/userSlice/userSlice", () => ({
  handleUserSignUpAction: vi.fn(() => ({
    payload: { status: true, message: "Signup successful" },
  })),
}));

describe("SignUp Component", () => {
  const setup = () =>
    render(
      <Provider store={store}>
        <BrowserRouter>
          <SignUp />
        </BrowserRouter>
      </Provider>
    );

  test("renders all input fields", () => {
    setup();
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    
  });

  test("shows error messages for empty form submit", async () => {
    setup();
    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/User role is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Profile image is required/i)).toBeInTheDocument();
    });
  });
});
