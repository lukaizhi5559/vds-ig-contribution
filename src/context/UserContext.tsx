// src/context/UserContext.tsx
import React, { createContext, useContext, useState } from "react";
import type { LoginUser } from "@/types";

// Define the shape of the UserContext
interface UserContextType {
    userDetails: LoginUser | undefined
    isAuthenticated: boolean;
    setUserDetails: (user: LoginUser) => void;
    logout: () => void;
    login: (user: LoginUser) => void;
}

// Create the context with a default value
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const hasUser = localStorage.getItem("user");
  let user = undefined;

  if (hasUser) {
    user = JSON.parse(hasUser);
    console.log("Cached User:", user);
  }

  const [userDetails, setUserDetails] = useState<LoginUser | undefined>(user);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(user ? true : false);

  const login = (user: LoginUser) => {
    setIsAuthenticated(true);
    setUserDetails(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  const logout = () => {
    setIsAuthenticated(false);
    setUserDetails(undefined); 
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ userDetails, isAuthenticated, setUserDetails, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
