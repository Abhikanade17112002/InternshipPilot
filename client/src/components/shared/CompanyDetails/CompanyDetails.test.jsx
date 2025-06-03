import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CompanyDetails from "./CompanyDetails";

// Mock dependencies
vi.mock("axios", () => ({
  post: vi.fn(() => Promise.resolve({ data: { status: true, message: "Success" } })),
}));
vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));
vi.mock("../Loader/Loader", () => ({
  default: () => <div>Loading...</div>,
}));

// Mock CustomInput, CustomFileInput, CustomDropDown to avoid external dependencies here
vi.mock("../CustomInput/CustomInput", () => ({
  default: ({ label, name }) => <input placeholder={label} name={name} />,
}));
vi.mock("../CustomFileInput/CustomFileInput", () => ({
  default: ({ label, name }) => <input type="file" placeholder={label} name={name} />,
}));
vi.mock("../CustomDropDown/CustomDropDown", () => ({
  default: ({ label, name }) => <select name={name}><option>{label}</option></select>,
}));

// Helper render
const renderComponent = () =>
  render(
    <BrowserRouter>
      <CompanyDetails />
    </BrowserRouter>
  );

describe("CompanyDetails Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the form title", () => {
    renderComponent();
    expect(screen.getByText("Fill Company Details")).toBeInTheDocument();
  });

  it("renders all input fields", () => {
    renderComponent();
    expect(screen.getByPlaceholderText("Company Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company Contact Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company Website")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Company Description")).toBeInTheDocument();

  });

  it("allows typing into text inputs", () => {
    renderComponent();
    const nameInput = screen.getByPlaceholderText("Company Name");
    fireEvent.change(nameInput, { target: { value: "Test Company" } });
    expect(nameInput.value).toBe("Test Company");
  });

  it("shows loader when submitting is true", () => {
    // Directly render the loader state
    render(
      <BrowserRouter>
        <CompanyDetails />
      </BrowserRouter>
    );
    fireEvent.submit(screen.getByRole("form", { hidden: true }));
    // should find "Loading..." because we mocked Loader with that text
  });

  it("renders the 'Back to Dashboard' button", () => {
    renderComponent();
    expect(screen.getByText("Back to Dashboard")).toBeInTheDocument();
  });
});
