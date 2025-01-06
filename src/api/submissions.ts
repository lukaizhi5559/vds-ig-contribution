import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./apiClient";

export type Submission = {
  id: number;
  title: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected";
  createdAt: string;
};

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

// Update submission status
export const updateSubmissionStatus = (
  submissionId: number,
  status: Submission["status"]
): Promise<Submission> =>
  apiClient<Submission>(`/api/submissions/${submissionId}`, {
    method: "PATCH",
    body: { status },
  });

// React Query Hooks
export const useSubmissions = () =>
  useQuery<Submission[], Error>({ queryKey: ["submissions"], queryFn: fetchSubmissions });

export const useSubmission = (submissionId: number) =>
  useQuery<Submission, Error>({
    queryKey: ["submissions", submissionId],
    queryFn: () => fetchSubmissionById(submissionId)
  });

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<Submission, Error, Omit<Submission, "id" | "createdAt">>(
    {
      mutationFn: (submission: Omit<Submission, "id" | "createdAt">) => createSubmission(submission),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["submissions"] });
      },
    }
  );
};

export const useUpdateSubmissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation<Submission, Error, { id: number; status: Submission["status"] }>(
    {
      mutationFn: ({ id, status }: { id: number; status: Submission["status"] }) => 
        updateSubmissionStatus(id, status),
    }
  );
};
