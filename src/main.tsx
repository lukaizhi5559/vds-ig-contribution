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

// Comment out for now as Vercell is whitelisting the environment variable
// console.log(process.env.VITE_VERCEL_ENV);
// const environment = process.env.VITE_VERCEL_ENV || 'preview';

// Uncomment the following line to use Mock Service Worker in development
// Mock service worker in development
// if (process.env.NODE_ENV === "development") {
//     // Use dynamic import for ESM compatibility
//     import("./mocks/browser").then(({ worker }) => {
//       worker.start();
//     });
// }

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
