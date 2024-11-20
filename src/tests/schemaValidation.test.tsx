import validateSchema from "../utils/schemaValidation";

describe("Schema Validation Utility", () => {
  test("valid schema passes validation", () => {
    const validSchema = {
      formTitle: "Test Form",
      fields: [
        { id: "field1", type: "text", label: "Field 1" },
        { id: "field2", type: "email", label: "Field 2" },
      ],
    };

    expect(() => validateSchema(validSchema)).not.toThrow();
  });

  test("invalid schema throws error", () => {
    const invalidSchema = {
      fields: [{ id: "field1", type: "text", label: "Field 1" }],
    };

    expect(() => validateSchema(invalidSchema)).toThrow(
      "Schema must include 'formTitle' and 'fields'."
    );
  });

  test("invalid field missing properties throws error", () => {
    const invalidSchema = {
      formTitle: "Test Form",
      fields: [{ id: "field1", type: "text" }],
    };

    expect(() => validateSchema(invalidSchema)).toThrow(
      "Each field must have 'id', 'type', and 'label'."
    );
  });
});
