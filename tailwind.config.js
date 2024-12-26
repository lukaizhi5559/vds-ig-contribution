/*!
 * Copyright (C) Verizon. All rights reserved.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enable dark mode using a "dark" class
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure all relevant files are scanned in your "src" folder
    "./public/index.html", // Include your HTML entry point (if applicable)
  ],
  theme: {
    extend: {}, // Extend the default Tailwind theme as needed
  },
  plugins: [], // Add plugins here if required
};
