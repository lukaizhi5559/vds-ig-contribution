/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React, { useEffect } from "react";
import { Outlet } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useUserContext } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useShellStyles } from "./Shell.styles";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import type { ShellProps } from "./Shell.types";

const queryClient = new QueryClient();

export const Shell: React.FC<ShellProps> = () => {
  const styles = useShellStyles();
  const { isAuthenticated } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: "/login", replace: true });
    }
  }, [isAuthenticated, navigate]);

  return (
    <QueryClientProvider client={queryClient}>
        <div className={styles.root}>
          <Header />
          <main className={styles.main}>
            <Outlet /> {/* Child routes will render here */}
          </main>
          <Footer />
        </div>
    </QueryClientProvider>
  );
};
