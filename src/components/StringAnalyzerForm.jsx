import React, { useState } from 'react';
import toast from 'react-hot-toast';


const StringAnalyzerForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [submittedData, setSubmittedData] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: '',
            }));
        }
    };

    //  VALIDATION LOGIC EXPLANATIONS

    /*
      [ALTERNATIVE 1: Manual Character-by-Character Loop (Without Regex)]
    
     * Description: Iterates through each character in the string and checks its
     * ASCII / character code to verify uppercase letters and non-alphanumeric special chars.
     *
     * const validatePasswordManual = (password) => {
     *   if (!password) return "Password is required";
     *   let hasCapital = false;
     *   let hasSpecial = false;
     *
     *   for (let i = 0; i < password.length; i++) {
     *     const code = password.charCodeAt(i);
     *     const isUpper = code >= 65 && code <= 90;   // A-Z
     *     const isLower = code >= 97 && code <= 122;  // a-z
     *     const isDigit = code >= 48 && code <= 57;   // 0-9
     *
     *     if (isUpper) hasCapital = true;
     *     // If character is neither letter nor number, it is a special character
     *     if (!isUpper && !isLower && !isDigit) hasSpecial = true;
     *   }
     *
     *   if (!hasCapital) {
     *     return "Password must contain at least one uppercase (capital) letter.";
     *   }
     *   if (!hasSpecial) {
     *     return "Password must contain at least one special character (e.g. !@#$%).";
     *   }
     *   return "";
     * };
     */

    /*
     * [ALTERNATIVE 2: Array Methods (Array.some & String manipulation)]

     * Description: Converts the password string into an array and checks criteria
     * using Array.prototype.some().
     *
     * const validatePasswordWithArray = (password) => {
     *   const chars = Array.from(password);
     *   const specialCharList = "!@#$%^&*()_+-=[]{}|;':\",./<>?`~";
     *   const hasUppercase = chars.some((ch) => ch >= 'A' && ch <= 'Z');
     *   const hasSpecial = chars.some((ch) => specialCharList.includes(ch));
     *
     *   if (!hasUppercase) return "Must have at least one capital letter.";
     *   if (!hasSpecial) return "Must have at least one special character.";
     *   return "";
     * };
     */

    /*
     * [ALTERNATIVE 3: Modern Industry Libraries (Yup, Formik, React Hook Form)]

     * In real-world enterprise applications, forms are often managed using
     * dedicated form state and schema validation libraries:
     *
     * 1. Yup / Zod (Schema Validation):
     *    - Defines declarative validation rules outside UI logic.
     *    - Example Yup Schema:
     *      const schema = yup.object().shape({
     *        username: yup.string().matches(/^[a-zA-Z0-9]+$/, 'No spaces or symbols').required(),
     *        password: yup.string().matches(/[A-Z]/, 'Must have capital letter').matches(/[^a-zA-Z0-9]/, 'Must have symbol').required()
     *      });
     *
     * 2. Formik (Form State Management):
     *    - Uses controlled components (state on every keystroke).
     *    - Pairs seamlessly with Yup schema (`validationSchema={schema}`).
     *
     * 3. React Hook Form (Performance-Focused Form Management):
     *    - Uses uncontrolled inputs with `ref` / custom hooks.
     *    - Minimizes re-renders on keystrokes and integrates easily with resolvers (Yup/Zod).
     */

    /*
     * [ACTIVE METHOD: Regular Expression Manual Validation]

     * This is the single active validation mechanism executed on form submit.
     */

    const validateForm = () => {
        const newErrors = {};

        // 1. First Name validation
        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        }

        // 2. Last Name validation
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        }

        // 3. Username validation:
        // Alphanumeric only (letters and numbers), no spaces, no special characters
        const usernameRegex = /^[a-zA-Z0-9]+$/;
        if (!formData.username.trim()) {
            newErrors.username = 'Username is required.';
        } else if (/\s/.test(formData.username)) {
            newErrors.username = 'Username cannot contain any spaces.';
        } else if (!usernameRegex.test(formData.username)) {
            newErrors.username =
                'Username can only contain letters and numbers (no special characters).';
        }

        // 4. Password validation:
        // MUST have at least one capital letter AND at least one special character
        const capitalLetterRegex = /[A-Z]/;
        const specialCharRegex = /[^a-zA-Z0-9\s]/; // matches any symbol/special character

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (!capitalLetterRegex.test(formData.password)) {
            newErrors.password =
                'Password must contain at least one capital (uppercase) letter.';
        } else if (!specialCharRegex.test(formData.password)) {
            newErrors.password =
                'Password must contain at least one special character (e.g., !@#$%^&*).';
        }

        return newErrors;
    };

    // Handle Form Submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = validateForm();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            toast.error('Please fix the errors in the form.');
            return;
        }

        // Clear errors and display validated submitted result
        setErrors({});
        const generatedResult = {
            fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
            firstName: formData.firstName.trim(),
            lastName: formData.lastName.trim(),
            username: formData.username.trim(),
            passwordMasked: '•'.repeat(formData.password.length),
            submittedAt: new Date().toLocaleTimeString(),
        };

        setSubmittedData(generatedResult);
        toast.success('Form validated and submitted successfully!');
    };

    // Compute live connected full name and word metrics
    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();
    const fullName = `${trimmedFirstName} ${trimmedLastName}`.trim();
    const fullNameWords = fullName ? fullName.split(/\s+/).filter(Boolean) : [];
    const fullNameLength = fullName.length;

    // Reset Form
    const handleReset = () => {
        setFormData({
            firstName: '',
            lastName: '',
            username: '',
            password: '',
        });
        setErrors({});
        setSubmittedData(null);
        toast('Form cleared', { icon: '🧹' });
    };

    return (
        <div className="min-h-screen bg-slate-100/80 text-slate-800 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-xl bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">

                <div className="border-b border-slate-100 pb-5 mb-6">
                    <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
                        Create Account String Analyzer
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                        Enter your details to analyze string lengths and validate credentials.
                    </p>
                </div>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label
                                    htmlFor="firstName"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    First name <span className="text-red-500">*</span>
                                </label>
                                <span className="text-xs text-slate-400 font-mono">
                                    Length: {formData.firstName.length}
                                </span>
                            </div>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                placeholder="John"
                                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-150 ${errors.firstName
                                    ? 'border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/20'
                                    : 'border-slate-300 focus:ring-indigo-100 focus:border-indigo-600 bg-white'
                                    }`}
                            />
                            {errors.firstName && (
                                <p className="mt-1.5 text-xs text-red-600 font-medium">
                                    {errors.firstName}
                                </p>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label
                                    htmlFor="lastName"
                                    className="block text-sm font-medium text-slate-700"
                                >
                                    Last name <span className="text-red-500">*</span>
                                </label>
                                <span className="text-xs text-slate-400 font-mono">
                                    Length: {formData.lastName.length}
                                </span>
                            </div>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                placeholder="Doe"
                                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-150 ${errors.lastName
                                    ? 'border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/20'
                                    : 'border-slate-300 focus:ring-indigo-100 focus:border-indigo-600 bg-white'
                                    }`}
                            />
                            {errors.lastName && (
                                <p className="mt-1.5 text-xs text-red-600 font-medium">
                                    {errors.lastName}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="p-3.5 bg-indigo-50/50 border border-indigo-100 rounded-lg space-y-1.5 text-xs">
                        <div className="flex items-center justify-between">
                            <span className="text-indigo-900 font-medium">Connected Full Name:</span>
                            <span className="font-semibold text-slate-900 text-sm">
                                {fullName || <span className="italic text-slate-400 font-normal">Waiting for name input...</span>}
                            </span>
                        </div>
                        {fullName && (
                            <div className="pt-1 border-t border-indigo-100/80 flex flex-wrap justify-between text-indigo-700 font-medium">
                                <span>Total length of entire text: <strong className="text-indigo-950 font-mono">{fullNameLength}</strong> characters</span>
                                <span>Word count: <strong className="text-indigo-950 font-mono">{fullNameWords.length}</strong> words</span>
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Username <span className="text-red-500">*</span>
                            </label>
                            <span className="text-xs text-slate-400 font-mono">
                                Length: {formData.username.length}
                            </span>
                        </div>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="johndoe123"
                            className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-150 ${errors.username
                                ? 'border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/20'
                                : 'border-slate-300 focus:ring-indigo-100 focus:border-indigo-600 bg-white'
                                }`}
                        />
                        {errors.username && (
                            <p className="mt-1.5 text-xs text-red-600 font-medium">
                                {errors.username}
                            </p>
                        )}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700"
                            >
                                Password <span className="text-red-500">*</span>
                            </label>
                            <span className="text-xs text-slate-400 font-mono">
                                Length: {formData.password.length}
                            </span>
                        </div>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter a secure password (e.g., Secret#123)"
                                className={`w-full px-3.5 py-2.5 pr-14 rounded-lg border text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-150 ${errors.password
                                    ? 'border-red-400 focus:ring-red-200 focus:border-red-500 bg-red-50/20'
                                    : 'border-slate-300 focus:ring-indigo-100 focus:border-indigo-600 bg-white'
                                    }`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs font-medium text-slate-500 hover:text-slate-700 focus:outline-none cursor-pointer"
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="mt-1.5 text-xs text-red-600 font-medium">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                        <button
                            type="submit"
                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition duration-150 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer"
                        >
                            Submit & Analyze
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            className="bg-white border border-slate-300 hover:bg-slate-50 active:bg-slate-100 text-slate-700 font-medium py-2.5 px-4 rounded-lg transition duration-150 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-300 cursor-pointer"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {submittedData && (
                    <div className="mt-6 pt-5 border-t border-slate-200 animate-fadeIn">
                        <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                <h3 className="text-sm font-semibold text-emerald-900">
                                    Validation & String Analysis Summary
                                </h3>
                            </div>

                            <div className="p-3 bg-white/80 rounded-md border border-emerald-100 text-xs text-slate-700 space-y-1">
                                <div className="font-semibold text-emerald-800 text-xs uppercase tracking-wider">
                                    Multiple Words String (Full Name):
                                </div>
                                <p>
                                    Connected Name: <strong className="text-slate-900">"{submittedData.fullName}"</strong>
                                </p>
                                <p>
                                    Length of entire text:{' '}
                                    <span className="font-bold text-emerald-900 font-mono">
                                        {submittedData.fullName.length}
                                    </span>{' '}
                                    characters
                                </p>
                                <p>
                                    Word count:{' '}
                                    <span className="font-bold text-emerald-900 font-mono">
                                        {submittedData.fullName.split(/\s+/).filter(Boolean).length}
                                    </span>{' '}
                                    words
                                </p>
                            </div>

                            <div className="p-3 bg-white/80 rounded-md border border-emerald-100 text-xs text-slate-700 space-y-1">
                                <div className="font-semibold text-emerald-800 text-xs uppercase tracking-wider">
                                    Single Word Strings:
                                </div>
                                <p>
                                    First Name: <span className="font-medium text-slate-900">"{submittedData.firstName}"</span> — Length of word:{' '}
                                    <span className="font-bold text-emerald-900 font-mono">{submittedData.firstName.length}</span> characters
                                </p>
                                <p>
                                    Last Name: <span className="font-medium text-slate-900">"{submittedData.lastName}"</span> — Length of word:{' '}
                                    <span className="font-bold text-emerald-900 font-mono">{submittedData.lastName.length}</span> characters
                                </p>
                                <p>
                                    Username: <span className="font-medium text-slate-900">"@{submittedData.username}"</span> — Length of word:{' '}
                                    <span className="font-bold text-emerald-900 font-mono">{submittedData.username.length}</span> characters
                                </p>
                            </div>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs pt-1">
                                <div>
                                    <dt className="text-slate-500">Password Status:</dt>
                                    <dd className="font-semibold text-emerald-700">
                                        Valid (Length: {formData.password.length} chars)
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-slate-500">Time Verified:</dt>
                                    <dd className="font-medium text-slate-600">
                                        {submittedData.submittedAt}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StringAnalyzerForm;
