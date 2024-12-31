/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { useCreateSubmissionStyles } from "./CreateSubmission.styles";

const CreateSubmissionPage = () => {
    const navigate = useNavigate();
    const styles = useCreateSubmissionStyles();
  
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        businessUseCase: "",
        componentOrigin: "",
        figmaFile: null as File | null,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({ 
            ...prevData, 
            figmaFile: e.target.files ? e?.target?.files[0] : null 
        }));
    };

    const handleSubmit = () => {
        console.log("Form Submitted:", formData);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>New Submission</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create Submission</DialogTitle>
                </DialogHeader>
                <div className={styles.formGroup}>
                <label htmlFor="title" className={styles.label}>Title</label>
                <Input
                    id="title"
                    name="title"
                    placeholder="Enter submission title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                </div>

                <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>Description</label>
                <Textarea
                    id="description"
                    name="description"
                    placeholder="Enter submission description"
                    value={formData.description}
                    onChange={handleInputChange}
                />
                </div>

                <div className={styles.formGroup}>
                <label htmlFor="businessUseCase" className={styles.label}>Business Use Case Description</label>
                <Textarea
                    id="businessUseCase"
                    name="businessUseCase"
                    placeholder="Enter business use case description"
                    value={formData.businessUseCase}
                    onChange={handleInputChange}
                />
                </div>

                <div className={styles.formGroup}>
                <label htmlFor="figmaFile" className={styles.label}>Figma File Upload</label>
                <Input
                    id="figmaFile"
                    name="figmaFile"
                    type="file"
                    onChange={handleFileChange}
                />
                </div>

                <div className={styles.formGroup}>
                <label htmlFor="componentOrigin" className={styles.label}>Component Origin</label>
                <Input
                    id="componentOrigin"
                    name="componentOrigin"
                    placeholder="Enter component origin URL"
                    value={formData.componentOrigin}
                    onChange={handleInputChange}
                />
                </div>

                <DialogFooter>
                <Button onClick={handleSubmit}>Save Submission</Button>
                <Button variant="outline" className="ml-4">Cancel</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateSubmissionPage;
