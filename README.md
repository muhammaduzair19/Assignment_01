# String Analyzer & Account Validation Form

A modern React application built with Vite and Tailwind CSS that combines interactive account registration with real-time string metrics and robust input validation.

---

## 📌 Overview

This project implements a user registration form equipped with live string analysis and multi-rule credential validation. It computes character lengths and word counts in real time, validates field constraints using regular expressions, and generates a structured string analysis report upon submission.

---

## ✨ Features

- **Live String Metrics**: Dynamic character counter displayed in real time for each input field.
- **Real-Time Full Name Composition**: Concatenates first and last name on the fly, calculating total character length and word count.
- **Strict Input Validation**:
  - **First & Last Name**: Required fields, whitespace-trimmed.
  - **Username**: Alphanumeric characters only (no spaces, symbols, or special characters).
  - **Password**: Requires at least one uppercase letter (`[A-Z]`) and at least one special character (`[^a-zA-Z0-9\s]`).
- **Show / Hide Password**: Convenient visibility toggle for password input.
- **Post-Submission String Analysis**:
  - **Multiple-Word Metrics**: Combined full name, total character length, and word count.
  - **Single-Word Breakdown**: Individual string lengths for first name, last name, and username.
  - **Security & Timestamp**: Password verification confirmation and submission timestamp.
- **Toast Notifications**: Interactive toast alerts powered by `react-hot-toast` for validation errors, successful submissions, and form resets.
- **Documented Alternative Algorithms**: Well-commented codebase outlining alternative validation approaches:
  - ASCII code / character-by-character loops (without regex).
  - Functional array methods (`Array.from` & `Array.prototype.some`).
  - Schema-based validation patterns (Yup / Zod / Formik / React Hook Form).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed (version 18+ recommended).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/string-analyzer-form.git
   cd string-analyzer-form
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```text
task_01/
├── public/              # Static assets
├── src/
│   ├── assets/          # Icons and images
│   ├── components/
│   │   └── StringAnalyzerForm.jsx  # Main form & string analysis component
│   ├── App.jsx          # Root component
│   ├── index.css        # Tailwind CSS imports & global styles
│   └── main.jsx         # Application entry point with toast provider
├── package.json         # Project metadata and dependencies
├── vite.config.js       # Vite configuration
└── README.md            # Project documentation
```

---

## 🧪 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles and bundles production-ready assets into `dist/` |
| `npm run preview` | Locally previews the production build |
| `npm run lint` | Runs ESLint to check for code quality and style errors |

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
