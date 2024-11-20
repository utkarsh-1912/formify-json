import React, { useState } from "react";
import JsonEditor from "./components/JsonEditor";
import FormGenerator from "./components/FormGenerator";
import validateSchema from "./utils/schemaValidation";

// Default schema (unchanged)
const defaultSchema = {
  formTitle: "Project Requirements Survey",
  formDescription: "Please fill out this survey about your project needs",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Full Name",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      id: "email",
      type: "email",
      label: "Email Address",
      required: true,
      placeholder: "you@example.com",
      validation: {
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        message: "Please enter a valid email address",
      },
    },
    {
      id: "companySize",
      type: "select",
      label: "Company Size",
      required: true,
      options: [
        { value: "1-50", label: "1-50 employees" },
        { value: "51-200", label: "51-200 employees" },
        { value: "201-1000", label: "201-1000 employees" },
        { value: "1000+", label: "1000+ employees" },
      ],
    },
    {
      id: "industry",
      type: "radio",
      label: "Industry",
      required: true,
      options: [
        { value: "tech", label: "Technology" },
        { value: "healthcare", label: "Healthcare" },
        { value: "finance", label: "Finance" },
        { value: "retail", label: "Retail" },
        { value: "other", label: "Other" },
      ],
    },
    {
      id: "timeline",
      type: "select",
      label: "Project Timeline",
      required: true,
      options: [
        { value: "immediate", label: "Immediate (within 1 month)" },
        { value: "short", label: "Short-term (1-3 months)" },
        { value: "medium", label: "Medium-term (3-6 months)" },
        { value: "long", label: "Long-term (6+ months)" },
      ],
    },
    {
      id: "comments",
      type: "textarea",
      label: "Additional Comments",
      required: false,
      placeholder: "Any other details you'd like to share...",
    },
  ],
};

const App = () => {
  const [jsonSchema, setJsonSchema] = useState(JSON.stringify(defaultSchema, null, 2));
  const [schema, setSchema] = useState(defaultSchema);
  const [error, setError] = useState<string | null>(null);

  const handleSchemaChange = (value: string) => {
    setJsonSchema(value);
    if(value===""){
      setSchema(JSON.parse("{}"));
    }
    try {
      const parsedSchema = JSON.parse(value);
      validateSchema(parsedSchema);
      setSchema(parsedSchema);
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    }
  };

  return (
    <>
      <header className="p-2 shadow-lg bg-white flex items-center">
      <img src="/logo-long.png" alt="Logo" className="h-12 pl-2" />
        {/* <img src="/logo-long.png" alt="Logo" className="w-12 h-12 mr-2" /> */}
        {/* <h2 className="text-2xl font-bold">Formify</h2> */}
      </header>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <div className="grid grid-cols-1 md:grid-cols-2 h-full gap-2">
        <JsonEditor value={jsonSchema} onChange={handleSchemaChange} error={error} />
        <FormGenerator schema={schema} />
      </div>
    </>
  );
};

export default App;
