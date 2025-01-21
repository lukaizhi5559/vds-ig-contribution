/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React, { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthLoginStyles } from "./AuthLogin.styles";
import { useCreateUser, useLoginUser } from "@/api/users";
import { useUserContext } from "@/context/UserContext";

const AuthLogin = () => {
  const styles = useAuthLoginStyles();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useUserContext();

  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  // Using React Query hooks
  const createUserMutation = useCreateUser();
  const loginUserMutation = useLoginUser();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    setError(null);
    const { email, password } = formData;

    try {
      const user = await loginUserMutation.mutateAsync({ email, password });

      if (user) {
        login(user);
        navigate({ to: "/contribution" });
      } else {
        setError("User not found. Please register first.");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  const handleRegister = async () => {
    setError(null);
    const { name, email, password } = formData;

    try {
      const user = await createUserMutation.mutateAsync({ name, email, password });
      login(user);
      navigate({ to: "/contribution" });
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Unable to register. Please try again later.");
    }
  };
  
  useEffect(() => {
      if (isAuthenticated) {
        navigate({ to: "/", replace: true });
      }
  }, [isAuthenticated, navigate]);

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.tabs}>
          <Button
            variant={activeTab === "login" ? "default" : "outline"}
            onClick={() => setActiveTab("login")}
          >
            Login
          </Button>
          <Button
            variant={activeTab === "register" ? "default" : "outline"}
            onClick={() => setActiveTab("register")}
          >
            Register
          </Button>
        </div>
        <h1 className={styles.title}>
          {activeTab === "login" ? "Welcome Back" : "Create an Account"}
        </h1>
        <p className={styles.subtitle}>
          {activeTab === "login"
            ? "Sign in to continue"
            : "Register to get started"}
        </p>

        {error && <p className={styles.error}>{error}</p>}

        {activeTab === "register" && (
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Name
            </label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        {activeTab === "login" && (
          <Button className={styles.signInButton} onClick={handleLogin}>
            Sign In
          </Button>
        )}

        {activeTab === "register" && (
          <Button
            variant="outline"
            className={styles.createAccountButton}
            onClick={handleRegister}
          >
            Register
          </Button>
        )}
      </div>
    </div>
  );
};

export default AuthLogin;
