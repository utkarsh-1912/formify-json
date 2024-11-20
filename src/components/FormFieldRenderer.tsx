import React from "react";

interface FormFieldRendererProps {
  field: any;
}

const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({ field }) => {
  switch (field.type) {
    case "text":
    case "email":
      return (
        <div className="mb-4">
          <label htmlFor={field.id} className="block mb-1">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            required={field.required}
            placeholder={field.placeholder}
            pattern={field.validation?.pattern}
            className="w-full p-2 border rounded"
          />
          {field.validation?.message && <p className="text-sm text-gray-500">{field.validation.message}</p>}
        </div>
      );
    case "select":
      return (
        <div className="mb-4">
          <label htmlFor={field.id} className="block mb-1">
            {field.label}
          </label>
          <select id={field.id} name={field.id} required={field.required} className="w-full p-2 border rounded">
            {field.options.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "radio":
      return (
        <div className="mb-4">
          <label className="block mb-1">{field.label}</label>
          {field.options.map((option: any) => (
            <label key={option.value} className="block">
              <input
                type="radio"
                id={`${field.id}-${option.value}`}
                name={field.id}
                value={option.value}
                required={field.required}
                className="mr-2"
              />
              {option.label}
            </label>
          ))}
        </div>
      );
    case "textarea":
      return (
        <div className="mb-4">
          <label htmlFor={field.id} className="block mb-1">
            {field.label}
          </label>
          <textarea
            id={field.id}
            name={field.id}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full p-2 border rounded"
          />
        </div>
      );
    default:
      return null;
  }
};

export default FormFieldRenderer;
