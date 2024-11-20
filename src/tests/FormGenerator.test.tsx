import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormGenerator from "../components/FormGenerator";

const mockSchema = {
  formTitle: "Sample Form",
  formDescription: "Please fill out this form",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter your name",
    },
    {
      id: "email",
      type: "email",
      label: "Email",
      required: true,
      placeholder: "Enter your email",
    },
  ],
};

describe("FormGenerator Component", () => {
  test("renders form title and description", () => {
    render(<FormGenerator schema={mockSchema} />);
    expect(screen.getByText("Sample Form")).toBeInTheDocument();
    expect(screen.getByText("Please fill out this form")).toBeInTheDocument();
  });

  test("renders form fields", () => {
    render(<FormGenerator schema={mockSchema} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });

  test("submits form data", () => {
    console.log = jest.fn();
    render(<FormGenerator schema={mockSchema} />);
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "john@example.com" } });
    fireEvent.click(screen.getByText("Submit"));

    expect(console.log).toHaveBeenCalledWith({
      name: "John Doe",
      email: "john@example.com",
    });
  });
});
