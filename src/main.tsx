/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./tailwind.css";
import { UserProvider } from "@/context/UserContext";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes"; // Import the router created in Shell.tsx

console.log('ENV VARIABLES:', process.env, process.env.VERCEL_ENV);

if (
  process.env.NODE_ENV === "development" || 
  process.env.VERCEL_ENV === "preview" || 
  process.env.VERCEL_ENV === "development") {
    // Use dynamic import for ESM compatibility
    import("./mocks/browser").then(({ worker }) => {
      worker.start();
    });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
