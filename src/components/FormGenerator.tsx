import React from "react";
import FormFieldRenderer from "./FormFieldRenderer";

interface FormGeneratorProps {
  schema: any;
}

const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const result: any = {};
    data.forEach((value, key) => {
      result[key] = value;
    });
    console.log("Form Submitted:", result);
    alert("Form submitted successfully!");
  };

  return (
    <div className="w-full md:w-[48vw] m-2 md:h-[87vh] resize-none overflow-auto mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">{schema.formTitle}</h2>
      <p className="text-sm text-gray-600 mb-6">{schema.formDescription}</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {schema.fields.map((field: any) => (
          <FormFieldRenderer key={field.id} field={field} />
        ))}
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-gray-600 hover:bg-gray-500 text-white font-medium rounded-lg py-2.5"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormGenerator;
