import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomDropDown from "./CustomDropDown";
import { useForm, FormProvider } from "react-hook-form";
import { vi } from "vitest";

// Wrapper to test with react-hook-form context
const Wrapper = ({ errorMessage, onSubmit }) => {
  const methods = useForm({
    defaultValues: { role: "" },
    mode: "onBlur",
  });

  // Create errors object that matches the expected format in CustomDropDown
  const errors = errorMessage
    ? {
        role: {
          message: errorMessage,
        },
      }
    : {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <CustomDropDown
          name="role"
          label="Role"
          placeholder="Select user role"
          dropDownOptions={[
            { value: "student", label: "Student" },
            { value: "recruiter", label: "Recruiter" },
          ]}
          control={methods.control}
          errors={errors}
        />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

describe("CustomDropDown Component", () => {
  const user = userEvent.setup();

  test("renders label and placeholder", () => {
    render(<Wrapper onSubmit={vi.fn()} />);
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveTextContent("Select user role");
  });

  test("opens dropdown and shows options on click", async () => {
    render(<Wrapper onSubmit={vi.fn()} />);
    await user.click(screen.getByRole("combobox"));

    await waitFor(() => {
      const options = screen.getAllByRole("option");
      expect(options.some(opt => opt.textContent === "Student")).toBe(true);
      expect(options.some(opt => opt.textContent === "Recruiter")).toBe(true);
    });
  });

  test("selects an option and updates form value", async () => {
    const onSubmit = vi.fn();
    const { container } = render(<Wrapper onSubmit={onSubmit} />);
  
    // Open the dropdown
    await user.click(screen.getByRole("combobox"));
    
    // Select the "Student" option
    const studentOption = screen.getAllByRole("option").find(
      opt => opt.textContent === "Student"
    );
    await user.click(studentOption);
  
    // Check displayed value
    await waitFor(() => {
      expect(screen.getByRole("combobox")).toHaveTextContent("Student");
    });
    
    // Submit form to trigger form state update
    await user.click(screen.getByRole("button", { name: "Submit" }));
    
    // Check that form was submitted with correct value
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { role: "student" },
        expect.anything()
      );
    });
  });

  test("shows error message when validation fails", () => {
    render(<Wrapper errorMessage="Role is required" onSubmit={vi.fn()} />);
    const errorElement = screen.getByText("Role is required");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveClass("error-text");
  });

  test("does not show error message if no error", () => {
    render(<Wrapper onSubmit={vi.fn()} />);
    expect(screen.queryByText("Role is required")).not.toBeInTheDocument();
  });

  test("submits form with selected value", async () => {
    const onSubmit = vi.fn();
    render(<Wrapper onSubmit={onSubmit} />);
    
    // Select an option
    await user.click(screen.getByRole("combobox"));
    const recruiterOption = screen.getAllByRole("option").find(
      opt => opt.textContent === "Recruiter"
    );
    await user.click(recruiterOption);
    
    // Submit form
    await user.click(screen.getByRole("button", { name: "Submit" }));
    
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { role: "recruiter" },
        expect.anything()
      );
    });
  });
});