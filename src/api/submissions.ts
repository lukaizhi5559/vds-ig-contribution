import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "./apiClient";

export type Comment = {
  user: string; // Name or identifier of the commenter
  timestamp: string; // Date and time of the comment
  text: string; // The actual comment text
};

export type ActivityLog = string; // A simple string describing the activity (or replace with a more structured type if needed)

export type Submission = {
  id: number | undefined;
  title: string;
  description: string;
  status: "Pending" | "Approved" | "Rejected" | "In Progress";
  createdAt: string;
  submittedBy?: string; // Name or identifier of the user who submitted
  comments?: Comment[]; // List of comments related to the submission
  activityLogs?: ActivityLog[]; // List of activity logs for the submission
  businessUseCase: string;
  componentOrigin: string;
  figmaFile: File | null,
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

// Create a new submission
export const updateSubmission = (
  submissionId: number | undefined,
  submission: Omit<Submission, "createdAt">,
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

  return useMutation<Submission, Error, Omit<Submission, "id" | "createdAt">>(
    {
      mutationFn: (submission: Omit<Submission, "id" | "createdAt">) => createSubmission(submission),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["submissions"] });
      },
    }
  );
};

export const useUpdateSubmission = () => {
  const queryClient = useQueryClient();

  return useMutation<Submission, Error, Omit<Submission, "createdAt">>(
    {
      mutationFn: (submission: Omit<Submission, "createdAt">) => updateSubmission(submission.id, submission),
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
