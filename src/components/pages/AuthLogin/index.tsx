/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthLoginStyles } from "./AuthLogin.styles";

const AuthLoginPage = () => {
  const styles = useAuthLoginStyles();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = () => {
    console.log("Logging in with:", formData);
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to Verizon Contribution Model</h1>
        <p className={styles.subtitle}>Sign in to continue</p>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email Address</label>
          <Input
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.forgotPasswordContainer}>
          <a href="#" className={styles.forgotPasswordLink}>Forgot Password?</a>
        </div>

        <Button className={styles.signInButton} onClick={handleLogin}>Sign In</Button>

        <div className={styles.divider}>OR</div>

        <div className={styles.createAccountSection}>
          <p className={styles.createAccountText}>Don't have an account?</p>
          <Button variant="outline" className={styles.createAccountButton}>Create Account</Button>
        </div>
      </div>
    </div>
  );
};

export default AuthLoginPage;
