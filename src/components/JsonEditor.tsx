import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

// Function to automatically format JSON with syntax highlighting
const formatJson = (json: string) => {
  try {
    const parsed = JSON.parse(json);
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    return json; // Return unformatted JSON if parsing fails
  }
};

interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

const JsonEditor: React.FC<JsonEditorProps> = ({ value, onChange, error }) => {
  const [localValue, setLocalValue] = useState(value);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setLocalValue(value); // Sync the initial value
  }, [value]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleToggleMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`p-6 shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">JSON Editor</h2>
        <button
          onClick={handleToggleMode}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          {darkMode ? (
            <MoonIcon className="h-5 w-5 text-white" />
          ) : (
            <SunIcon className="h-5 w-5 text-white" />
          )}
        </button>
      </div>

      <div className="relative">
      {error && <p className="text-red-700 mt-2 bg-red-300 rounded p-2 my-2">{error}</p>}
        <textarea
          value={localValue}
          onChange={handleJsonChange}
          className={`w-full min-h-96 md:min-h-[75vh] h-full p-3 border rounded resize-none overflow-auto ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"} focus:outline-none`}
          placeholder="Enter JSON here..."
        />
      </div>
    </div>
  );
};

export default JsonEditor;

