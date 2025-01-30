/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./apiClient";
import { LoginUser, User } from "@/types";


// Headers for FormData requests (Login)
const FORM_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded",
};

// Fetch all users
export const fetchUsers = (): Promise<User[]> =>
  apiClient<User[]>("/users");

// Fetch a single user by ID
export const fetchUserById = (userId: number): Promise<User> =>
  apiClient<User>("/users/${userId}");

// Create a new user (Sign Up)
export const createUser = (user: Omit<User, "id">): Promise<LoginUser> =>
  apiClient<LoginUser>("/signup", {
    method: "POST",
    body: {
      email: user.email,
      password: user.password,
    },
  });

// Login a user
export const loginUser = async (user: Omit<User, "id" | "name">): Promise<LoginUser> => {
  const formData = new URLSearchParams();
  formData.append("username", user.email);
  formData.append("password", user.password || "");

  return apiClient<LoginUser>("/login", {
    method: "POST",
    headers: FORM_HEADERS,
    body: formData.toString(), // Encode as x-www-form-urlencoded
  });
};

// Delete a user
export const deleteUser = (userId: number): Promise<{ message: string }> =>
  apiClient<{ message: string }>("/users/${userId}", {
    method: "DELETE",
  });

// React Query Hooks
export const useUsers = () =>
  useQuery<User[], Error>({ queryKey: ["users"], queryFn: fetchUsers });

export const useUser = (userId: number) =>
  useQuery<User, Error>({
    queryKey: ["users", userId],
    queryFn: () => fetchUserById(userId),
  });

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginUser, Error, Omit<User, "id" | "name">>({
    mutationFn: loginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<LoginUser, Error, Omit<User, "id">>({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, number>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
