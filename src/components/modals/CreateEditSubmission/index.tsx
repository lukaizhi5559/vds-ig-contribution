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
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useCreateEditSubmissionStyles } from "./CreateEditSubmission.styles";
import {
  useSubmission,
  useCreateSubmission,
  useUpdateSubmission,
  Submission,
} from "@/api/submissions";

type CreateEditSubmissionProps = {
  submissionId?: number;
  isEdit?: boolean;
};

const CreateEditSubmission = ({
  isEdit = false,
  submissionId,
}: CreateEditSubmissionProps) => {
  const styles = useCreateEditSubmissionStyles();
  const { toast } = useToast();

  // Dialog State
  const [isOpen, setIsOpen] = useState(false);

  // React State
  const [formData, setFormData] = useState<Submission>({
    id: 0,
    title: "",
    description: "",
    businessUseCase: "",
    createdAt: "",
    componentOrigin: "",
    status: "In Progress",
    figmaFile: "",
    submittedBy: "",
    comments: [],
    activityLogs: [],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const { data: submission, isLoading } = useSubmission(submissionId);

  const createSubmissionMutation = useCreateSubmission();
  const updateSubmissionMutation = useUpdateSubmission();

  // Populate form data when editing
  useEffect(() => {
    if (isEdit && submission) {
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

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title?.trim()) {
      newErrors.title = "Title is required.";
    }

    if (!formData.description?.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.businessUseCase?.trim()) {
      newErrors.businessUseCase = "Business Use Case Description is required.";
    }

    if (!formData.componentOrigin?.trim()) {
      newErrors.componentOrigin = "Component Origin is required.";
    } else {
      try {
        new URL(formData.componentOrigin);
      } catch {
        newErrors.componentOrigin = "Component Origin must be a valid URL.";
      }
    }

    if (!formData.figmaFile?.trim()) {
      newErrors.componentOrigin = "A Figma File Url or File Key is required.";
    } else {
      try {
        new URL(formData.figmaFile);
      } catch {
        newErrors.componentOrigin = "Figma File must be a valid URL.";
      }
    }

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
    if (!validateForm()) {
      return;
    }

    if (isEdit && submissionId) {
        const { title, description, businessUseCase, componentOrigin, figmaFile } =
        formData;
      updateSubmissionMutation.mutate(
        {
          id: submissionId,
          title,
          description,
          businessUseCase,
          componentOrigin,
          figmaFile,
          status: formData.status,
        },
        {
          onSuccess: () => {
            toast({
              title: "Submission Updated",
              description: "The submission was updated successfully.",
            });
            setIsOpen(false); // Close dialog on success
          },
          onError: (error) => {
            toast({
              title: "Submission Update Failed",
              description: error instanceof Error ? error.message : "Unknown error",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          },
        }
      );
    } else {
      const { title, description, businessUseCase, componentOrigin, figmaFile } =
        formData;
      createSubmissionMutation.mutate(
        {
          title,
          description,
          businessUseCase,
          componentOrigin,
          figmaFile,
          status: "In Progress",
        },
        {
          onSuccess: () => {
            toast({
              title: "Submission Created",
              description: "A new submission was created successfully.",
            });
            setIsOpen(false); // Close dialog on success
          },
          onError: (error) => {
            toast({
              title: "Submission Creation Failed",
              description: error instanceof Error ? error.message : "Unknown error",
              action: <ToastAction altText="Try again">Try again</ToastAction>,
            });
          },
        }
      );
    }
  };

  if (isEdit && isLoading) {
    return <div>Loading submission details...</div>;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <Button variant="outline">Edit</Button>
        ) : (
          <Button>New Submission</Button>
        )}
      </DialogTrigger>
      <DialogContent
        className={styles.dialogContent}
        aria-describedby={undefined}
      >
        <DialogHeader className={styles.dialogHeader}>
          <DialogTitle className={styles.dialogTitle}>
            {isEdit ? "Edit Submission" : "Create Submission"}
          </DialogTitle>
        </DialogHeader>
        <div className={styles.contentWrapper}>
          {/* Form Fields */}
            <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>
                Title*
                </label>
                <Input
                id="title"
                name="title"
                placeholder="Enter submission title"
                value={formData.title}
                onChange={handleInputChange}
                className={styles.input}
                />
                {errors.title && (
                <span className={styles.errorText}>{errors.title}</span>
                )}
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
                    Figma File Origin*
                </label>
                <Input
                    id="figmaFile"
                    name="figmaFile"
                    placeholder="Enter Figma File URL or File Key"
                    value={formData.figmaFile}
                    onChange={handleInputChange}
                    className={styles.input}
                />
                {errors.figmaFile && (
                    <span className={styles.errorText}>{errors.figmaFile}</span>
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
          <Button onClick={handleSubmit} className={styles.submitButton}>
            {isEdit ? "Update Submission" : "Save Submission"}
          </Button>
          <DialogClose asChild>
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
