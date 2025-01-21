import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./apiClient";

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

// Fetch all users
export const fetchUsers = (): Promise<User[]> => apiClient<User[]>("/api/users");

// Fetch a single user by ID
export const fetchUserById = (userId: number): Promise<User> =>
  apiClient<User>(`/api/users/${userId}`);

// Create a new user
export const createUser = (user: Omit<User, "id">): Promise<User> =>
  apiClient<User>("/api/users", { method: "POST", body: user });

// Delete a user
export const deleteUser = (userId: number): Promise<{ message: string }> =>
  apiClient<{ message: string }>(`/api/users/${userId}`, { method: "DELETE" });

// Login a user
export const loginUser = (user: Omit<User, "id"|"name">): Promise<User> =>
  apiClient<User>("/api/users/login", { method: "POST", body: user });


// React Query Hooks
export const useUsers = () =>
  useQuery<User[], Error>({ queryKey: ["users"], queryFn: fetchUsers });

export const useUser = (userId: number) => useQuery<User, Error>({ 
  queryKey: ["users", userId], 
  queryFn: () => fetchUserById(userId),
});

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, Omit<User, "id"|"name">>(
    {
      mutationFn: loginUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }
  );
}

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, Omit<User, "id">>(
    {
      mutationFn: createUser,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["users"] });
      },
    }
  );
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
