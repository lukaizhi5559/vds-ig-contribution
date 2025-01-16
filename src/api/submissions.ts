import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Submission } from "@/types";
import { apiClient } from "./apiClient";

// Fetch all submissions
export const fetchSubmissions = (): Promise<Submission[]> =>
  apiClient<Submission[]>("/api/submissions");

// Fetch a single submission by ID
export const fetchSubmissionById = (submissionId: number): Promise<Submission> =>
  apiClient<Submission>(`/api/submissions/${submissionId}`);

// Create a new submission
export const createSubmission = (
  submission: Omit<Submission, "id" | "createdAt">
): Promise<Submission> =>
  apiClient<Submission>("/api/submissions", {
    method: "POST",
    body: submission,
  });

// Update a submission
export const updateSubmission = (
  submissionId: number | undefined,
  submission: Omit<Submission, "createdAt">
): Promise<Submission> =>
  apiClient<Submission>(`/api/submissions/${submissionId}`, {
    method: "PATCH",
    body: submission,
  });

// Update submission status
export const updateSubmissionStatus = (
  submissionId: number,
  status: Submission["status"]
): Promise<Submission> =>
  apiClient<Submission>(`/api/submissions/${submissionId}`, {
    method: "PATCH",
    body: { status },
  });

// Delete a submission by ID
export const deleteSubmission = (submissionId: number): Promise<void> =>
  apiClient<void>(`/api/submissions/${submissionId}`, {
    method: "DELETE",
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
