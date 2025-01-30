/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Submission } from "@/types";
import { apiClient } from "./apiClient";
import { useUserContext } from "@/context/UserContext"; // Ensure this exists for getting the logged-in user
import { getSubmitterIdFromToken } from "@/lib/utils";

const HEADERS = {
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
    headers: HEADERS,
  });

// Create a new submission (Pass `submitter_id` as an argument)
export const createSubmission = async (
  submission: Omit<Submission, "id" | "submitter_id" | "createdAt">,
  submitterId: number | undefined,
): Promise<Submission> => {
  if (!submitterId) {
    throw new Error("User ID is required to create a submission");
  }

  return apiClient<Submission>("/ticket", {
    method: "POST",
    headers: HEADERS,
    body: { ...submission, submitter_id: submitterId }, // Ensure unique `submitter_id`
  });
};

// Update a submission
export const updateSubmission = (
  submissionId: number | undefined,
  submission: Omit<Submission, "createdAt">
): Promise<Submission> =>
  apiClient<Submission>(`/ticket/${submissionId}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify(submission),
  });

// Update submission status
export const updateSubmissionStatus = (
  submissionId: number,
  status: Submission["status"]
): Promise<Submission> =>
  apiClient<Submission>(`/ticket/${submissionId}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify({ status }),
  });

// Delete a submission by ID
export const deleteSubmission = (submissionId: number): Promise<void> =>
  apiClient<void>(`/ticket/${submissionId}`, {
    method: "DELETE",
    headers: HEADERS,
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
  const { userDetails } = useUserContext(); // Get user details in a valid React hook scope


  return useMutation<Submission, Error, Omit<Submission, "id" | "submitter_id" | "createdAt">>({
    mutationFn: (submission) => {
      if (!userDetails || !userDetails.access_token
      ) {
        throw new Error("User must be logged in to create a submission");
      }
      console.log('User Details:', submission, getSubmitterIdFromToken(userDetails?.access_token));
      return createSubmission(
        submission, 
        getSubmitterIdFromToken(userDetails?.access_token)
      );
    },
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