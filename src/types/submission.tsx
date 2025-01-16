import { ProcessedData } from "./figma";

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
    status: "in progress" | "success" | "error" | "rejected";
    createdAt: string;
    submittedBy?: string; // Name or identifier of the user who submitted
    comments?: Comment[]; // List of comments related to the submission
    activityLogs?: ActivityLog[]; // List of activity logs for the submission
    businessUseCase: string;
    componentOrigin: string;
    figmaFile: string,
    figmaData?: ProcessedData | null,
};