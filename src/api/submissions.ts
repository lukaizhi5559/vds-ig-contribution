/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Submission } from "@/types";
import { apiClient } from "./apiClient";

const AUTH_TOKEN = "txNbg8fkbWub"; // Bearer token for API authentication
const HEADERS = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
  "Content-Type": "application/json",
};

// Fetch all submissions
export const fetchSubmissions = async (): Promise<Submission[]> => {
  const response = await apiClient<{ results: Submission[] }>("/ticket/search/?keyword=all", {
    method: "GET",
    headers: HEADERS,
  });

  return response.results; // Extract and return only the "results" array
};


// Fetch a single submission by ID
export const fetchSubmissionById = (submissionId: number): Promise<Submission> =>
  apiClient<Submission>(`/ticket/${submissionId}`, {
    method: "GET",
    headers: HEADERS, // Pass headers
  });

// Create a new submission
export const createSubmission = (
  submission: Omit<Submission, "id" | "createdAt">
): Promise<Submission> =>
  apiClient<Submission>("/ticket", {
    method: "POST",
    headers: HEADERS, // Pass headers
    body: JSON.stringify(submission), // Ensure body is stringified
  });

// Update a submission
export const updateSubmission = (
  submissionId: number | undefined,
  submission: Omit<Submission, "createdAt">
): Promise<Submission> =>
  apiClient<Submission>(`/ticket/${submissionId}`, {
    method: "PATCH",
    headers: HEADERS, // Pass headers
    body: JSON.stringify(submission), // Ensure body is stringified
  });

// Update submission status
export const updateSubmissionStatus = (
  submissionId: number,
  status: Submission["status"]
): Promise<Submission> =>
  apiClient<Submission>(`/ticket/${submissionId}`, {
    method: "PATCH",
    headers: HEADERS, // Pass headers
    body: JSON.stringify({ status }), // Ensure body is stringified
  });

// Delete a submission by ID
export const deleteSubmission = (submissionId: number): Promise<void> =>
  apiClient<void>(`/ticket/${submissionId}`, {
    method: "DELETE",
    headers: HEADERS, // Pass headers
  });

// React Query Hooks
export const useSubmissions = () =>
  useQuery<Submission[], Error>({ queryKey: ["submissions"], queryFn: fetchSubmissions });

export const useSubmission = (submissionId: number | undefined) =>
  useQuery<Submission, Error>({
    queryKey: ["submissions", submissionId],
    queryFn: submissionId ? () => fetchSubmissionById(submissionId) : undefined,
  });

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<Submission, Error, Omit<Submission, "id" | "createdAt">>({
    mutationFn: (submission: Omit<Submission, "id" | "createdAt">) => createSubmission(submission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};

export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<Submission, Error, Omit<Submission, "createdAt">>({
    mutationFn: (submission: Omit<Submission, "createdAt">) =>
      updateSubmission(submission.id, submission),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};

export const useUpdateSubmissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Submission, Error, { id: number; status: Submission["status"] }>({
    mutationFn: ({ id, status }: { id: number; status: Submission["status"] }) =>
      updateSubmissionStatus(id, status),
  });
};

// React Query Hook for deleting a submission
export const useDeleteSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (submissionId: number) => deleteSubmission(submissionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] });
    },
  });
};