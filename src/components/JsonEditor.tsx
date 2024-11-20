import React, { useState, useEffect } from "react";
import { SunIcon, MoonIcon, ClipboardIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [viewMode, setViewMode] = useState<"editor" | "viewer">("editor");

  useEffect(() => {
    setLocalValue(value); // Sync the initial value
  }, [value]);

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue); // No error handling for empty input
  };

  const handleToggleMode = () => {
    setDarkMode(!darkMode);
  };

  const handleViewModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setViewMode(e.target.value as "editor" | "viewer");
  };

  // Function to copy JSON to clipboard and show toast
  const handleCopyJson = () => {
    navigator.clipboard.writeText(localValue).then(() => {
      toast.success("JSON copied to clipboard!"); // Toast message
    });
  };

  // Function to download JSON as a file
  const handleDownloadJson = () => {
    const blob = new Blob([localValue], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "form.json";
    link.click();
  };

  return (
    <div className={`p-6 shadow-lg h-full ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"}`}>
      <div className="flex justify-between items-center mb-4">
        {/* Dropdown for switching between editor and viewer */}
        <div>
          <label htmlFor="viewMode" className="mr-2 font-semibold">Mode:</label>
          <select
            id="viewMode"
            value={viewMode}
            onChange={handleViewModeChange}
            className={`p-1 border rounded ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"} focus:outline-none`}
          >
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopyJson}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <ClipboardIcon className="h-5 w-5 text-white" />
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-400"
          >
            <ArrowDownTrayIcon className="h-5 w-5 text-white" />
          </button>
          
          <button
            onClick={handleToggleMode}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            {darkMode ? <SunIcon className="h-5 w-5 text-white" /> : <MoonIcon className="h-5 w-5 text-white" />}
          </button>
        </div>
      </div>

      <div className="relative">
        {error && localValue.trim() !== "" && (
          <p className="text-red-700 mt-2 bg-red-300 rounded p-2 my-2">{error}</p>
        )}

        {/* Render based on view mode */}
        {viewMode === "editor" ? (
          <textarea
            value={localValue}
            onChange={handleJsonChange}
            className={`w-full min-h-96 md:min-h-[75vh] h-full p-3 border rounded resize-none overflow-auto ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"} focus:outline-none`}
            placeholder="Enter JSON here..."
          />
        ) : (
          <pre
            className={`w-full min-h-48 h-full max-h-[75vh] p-3 border rounded resize-none overflow-y-auto ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-800"} focus:outline-none`}
          >
            {formatJson(localValue)}
          </pre>
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default JsonEditor;
