import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import JsonEditor from "../components/JsonEditor";

describe("JsonEditor Component", () => {
  const mockOnChange = jest.fn();

  test("renders JSON editor with initial value", () => {
    render(<JsonEditor value='{"key": "value"}' onChange={mockOnChange} error={null} />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toHaveValue('{"key": "value"}');
  });

  test("calls onChange when input changes", () => {
    render(<JsonEditor value='{"key": "value"}' onChange={mockOnChange} error={null} />);
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: '{"newKey": "newValue"}' } });
    expect(mockOnChange).toHaveBeenCalledWith('{"newKey": "newValue"}');
  });

  test("displays error message", () => {
    render(<JsonEditor value='{"key": "value"}' onChange={mockOnChange} error="Invalid JSON" />);
    expect(screen.getByText("Invalid JSON")).toBeInTheDocument();
  });
});
