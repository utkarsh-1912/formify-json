
# Formify

## Overview

**Formify** is a web-based tool for creating and managing dynamic forms based on JSON schemas. Users can define form structures in JSON format, edit them in real-time, and preview the forms. The application validates JSON schemas and provides a live preview of the form fields.

## Features

- **JSON Schema Editor**: A rich, real-time editor to manage and modify form schemas.
- **Form Preview**: Automatically generates a form based on the schema and displays it for user input.
- **Error Handling**: Provides immediate feedback for invalid or incomplete schemas.
- **Responsive UI**: Optimized for both desktop and mobile devices.

## Setup Instructions

### Prerequisites

- Node.js (>= 18.x)
- NPM (>= 7.x)
- TypeScript
- Tailwind CSS
- Playwright for E2E testing
- Jest for unit testing


### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/formify.git
   cd formify
   ```

2. **Install dependencies**:

   Make sure you have `node` and `npm` installed. Run the following command to install the required dependencies:

   ```bash
   npm install
   ```

3. **Run the development server**:

   Once the dependencies are installed, you can start the development server using:

   ```bash
   npm start
   ```

   This will start the app on `http://localhost:3000/`.


### Run in Production

To build the application for production and serve it:

1. **Build the app**:

   ```bash
   npm run build
   ```

2. **Serve the app** (optional):

   You can serve the production build locally using a static server like `serve`:

   ```bash
   npm install -g serve
   serve -s build
   ```

   The app will be available at `http://localhost:5000/`.


## Example JSON Schemas

### Example 1: Basic Form Schema

```json
{
  "formTitle": "Project Requirements Survey",
  "formDescription": "Please fill out this survey about your project needs",
  "fields": [
    {
      "id": "name",
      "type": "text",
      "label": "Full Name",
      "required": true,
      "placeholder": "Enter your full name"
    },
    {
      "id": "email",
      "type": "email",
      "label": "Email Address",
      "required": true,
      "placeholder": "you@example.com",
      "validation": {
        "pattern": "^[^\s@]+@[^\s@]+\.[^\s@]+$",
        "message": "Please enter a valid email address"
      }
    },
    {
      "id": "companySize",
      "type": "select",
      "label": "Company Size",
      "required": true,
      "options": [
        { "value": "1-50", "label": "1-50 employees" },
        { "value": "51-200", "label": "51-200 employees" },
        { "value": "201-1000", "label": "201-1000 employees" },
        { "value": "1000+", "label": "1000+ employees" }
      ]
    }
  ]
}
```

### Example 2: Form with Radio Buttons

```json
{
  "formTitle": "Industry Survey",
  "formDescription": "Please select your industry",
  "fields": [
    {
      "id": "industry",
      "type": "radio",
      "label": "Industry",
      "required": true,
      "options": [
        { "value": "tech", "label": "Technology" },
        { "value": "healthcare", "label": "Healthcare" },
        { "value": "finance", "label": "Finance" }
      ]
    }
  ]
}
```

## Local Development Guide

1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the development server with `npm start`.
4. Open your browser and visit `http://localhost:3000/`.