/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import "./tailwind.css";
import { RouterProvider } from "@tanstack/react-router";
import { UserProvider } from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "@/routes"; // Import the router created in Shell.tsx

if (process.env.NODE_ENV === "development") {
  // Use dynamic import for ESM compatibility
  import("./mocks/browser").then(({ worker }) => {
    worker.start();
  });
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </QueryClientProvider>
  </React.StrictMode>
);

