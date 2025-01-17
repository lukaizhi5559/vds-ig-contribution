/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useCreateEditSubmissionStyles } from "./CreateEditSubmission.styles";
import {
  useSubmission,
  useCreateSubmission,
  useUpdateSubmission,
} from "@/api/submissions";
import { Submission } from "@/types";
import useFigmaData from "@/hooks/useFigmaData";

type CreateEditSubmissionProps = {
  submissionId?: number;
  isEdit?: boolean;
  onSuccess?: () => void; // Callback to trigger re-render in parent
};

const defaultFormData: Submission = {
  id: 0,
  title: "",
  description: "",
  businessUseCase: "",
  createdAt: "",
  componentOrigin: "",
  status: "in progress",
  figmaFile: "",
  submittedBy: "",
  comments: [],
  activityLogs: [],
}

const CreateEditSubmission = ({
  isEdit = false,
  submissionId,
  onSuccess,
}: CreateEditSubmissionProps) => {
  const styles = useCreateEditSubmissionStyles();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [shouldFetchFigmaData, setShouldFetchFigmaData] = useState(false);
  const [showWarning, setShowWarning] = useState(true); // State for showing/hiding the warning

  const [formData, setFormData] = useState<Submission>(defaultFormData);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const { data: submission, isLoading } = useSubmission(submissionId);
  const createSubmissionMutation = useCreateSubmission();
  const updateSubmissionMutation = useUpdateSubmission();

  const { processedData, status: figmaStatus, error: figmaError } = useFigmaData(
    formData.figmaFile,
    shouldFetchFigmaData
  );

  useEffect(() => {
    if (isEdit && submission) {
      console.log('EDIT SUBMISSION', submission);
      setFormData({
        id: submission.id,
        title: submission.title,
        description: submission.description,
        businessUseCase: submission.businessUseCase,
        componentOrigin: submission.componentOrigin,
        status: submission.status,
        createdAt: submission.createdAt,
        submittedBy: submission.submittedBy,
        comments: submission.comments,
        activityLogs: submission.activityLogs,
        figmaFile: submission.figmaFile,
      });
    } 
  }, [isEdit, submission]);

  const resetFormData = () => {
    setFormData(defaultFormData);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.title?.trim()) newErrors.title = "Title is required.";
    if (!formData.figmaFile?.trim()) newErrors.figmaFile = "A Figma File URL or File Key is required.";

    // Commented out for now as these fields are not required
    // if (!formData.description?.trim()) {
    //   newErrors.description = "Description is required.";
    // }

    // if (!formData.businessUseCase?.trim()) {
    //   newErrors.businessUseCase = "Business Use Case Description is required.";
    // }

    // if (!formData.componentOrigin?.trim()) {
    //   newErrors.componentOrigin = "Component Origin is required.";
    // } else {
    //   try {
    //     new URL(formData.componentOrigin);
    //   } catch {
    //     newErrors.componentOrigin = "Component Origin must be a valid URL.";
    //   }
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (figmaStatus === "error") {
      toast({ title: "Figma Data Fetch Failed", description: figmaError || "Unknown error fetching Figma data." });
      return;
    }

    const payload = {
      ...formData,
      status: (processedData?.status as "in progress" | "success" | "error" | "rejected") || "in progress",
      figmaData: processedData,
    };

    if (isEdit && submissionId) {
      updateSubmissionMutation.mutate(
        { ...payload, id: submissionId },
        {
          onSuccess: () => {
            toast({ title: "Submission Updated", description: "The submission was updated successfully." });
            setIsOpen(false);
            setShouldFetchFigmaData(false);
            onSuccess?.();
          },
          onError: (error) => {
            toast({ title: "Submission Update Failed", description: error instanceof Error ? error.message : "Unknown error" });
          },
        }
      );
    } else {
      createSubmissionMutation.mutate(payload, {
        onSuccess: () => {
          toast({ title: "Submission Created", description: "A new submission was created successfully." });
          setIsOpen(false);
          setShouldFetchFigmaData(false);
          onSuccess?.();
        },
        onError: (error) => {
          toast({ title: "Submission Creation Failed", description: error instanceof Error ? error.message : "Unknown error" });
        },
      });
    }
  };

  useEffect(() => {
    if (figmaStatus === "success" && shouldFetchFigmaData) {
      handleSubmit();
    }
  }, [figmaStatus, shouldFetchFigmaData]);

  if (isEdit && isLoading) {
    return <div>Loading submission details...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEdit ? <Button onClick={() => {
          setShouldFetchFigmaData(false);
        }} variant="outline">Edit</Button> :
         <Button onClick={resetFormData}>New Submission</Button>
        }
      </DialogTrigger>
      <DialogContent className={styles.dialogContent}>
        <DialogHeader className={styles.dialogHeader}>
          <DialogTitle className={styles.dialogTitle}>
            {isEdit ? "Edit Submission" : "Create Submission"}
          </DialogTitle>
        </DialogHeader>

        {/* Alert Section */}
        {showWarning && (
          <Alert className="bg-orange-100 border-orange-300 relative">
            <Button
              variant="ghost"
              className="absolute right-2 top-2"
              onClick={() => setShowWarning(false)}
            >
              ✕
            </Button>
            <AlertTitle className="text-orange-700 font-bold">Warning</AlertTitle>
            <AlertDescription className="text-orange-600">
              Ensure your submission includes all required elements, such as <strong>Figma Usage Guide</strong> and <strong>Variant</strong>. Missing these may result in rejection. Need help? <a href="#" className="text-blue-600 underline">View the guide</a>.
            </AlertDescription>
          </Alert>
        )}

        <div className={styles.contentWrapper}>
          {/* Form Fields */}
          <div className={styles.formGroup}>
            <label htmlFor="title" className={styles.label}>
              Title*
            </label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className={styles.input}
            />
            {errors.title && <span className={styles.errorText}>{errors.title}</span>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description" className={styles.label}>
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter submission description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.textarea}
            />
            {errors.description && (
              <span className={styles.errorText}>{errors.description}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="businessUseCase" className={styles.label}>
              Business Use Case Description
            </label>
            <Textarea
              id="businessUseCase"
              name="businessUseCase"
              placeholder="Enter business use case description"
              value={formData.businessUseCase}
              onChange={handleInputChange}
              className={styles.textarea}
            />
            {errors.businessUseCase && (
              <span className={styles.errorText}>{errors.businessUseCase}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="figmaFile" className={styles.label}>
              Figma File URL or Key*
            </label>
            <Input
              id="figmaFile"
              name="figmaFile"
              value={formData.figmaFile}
              onChange={handleInputChange}
              className={styles.input}
            />
            {errors.figmaFile && (
              <span className={styles.errorText}>{errors.figmaFile}</span>
            )}
            {figmaStatus === "loading" && <div>Loading Figma data...</div>}
            {figmaStatus === "error" && (
              <div className={styles.errorText}>{figmaError}</div>
            )}
            {processedData?.status === "success" && processedData && (
              <div className={styles.successText}>
                Figma data fetched successfully!
              </div>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="componentOrigin" className={styles.label}>
              Component Origin
            </label>
            <Input
              id="componentOrigin"
              name="componentOrigin"
              placeholder="Enter component origin URL"
              value={formData.componentOrigin}
              onChange={handleInputChange}
              className={styles.input}
            />
            {errors.componentOrigin && (
              <span className={styles.errorText}>{errors.componentOrigin}</span>
            )}
          </div>
        </div>
        <DialogFooter className={styles.dialogFooter}>
          <Button
            onClick={() => {
              if (validateForm()) {
                setShouldFetchFigmaData(true);
              }
            }}
            className={styles.submitButton}
          >
            {isEdit ? "Update Submission" : "Save Submission"}
          </Button>
          <DialogClose
             asChild
            >
            <Button variant="outline" className={styles.cancelButton}>
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEditSubmission;
