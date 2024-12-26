
/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Label } from "../ui/Label";
import { Select, SelectItem, SelectTrigger, SelectContent } from "../ui/Select";
import { Textarea } from "../ui/Textarea";
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
    formItem: {
        marginBottom: '15px', // Add margin-bottom for form items
    },
    label: {
        display: 'block',
        marginBottom: '5px', // Add margin-bottom for labels
    },
});

export default function ContributionForm() {
    const classes = useStyles();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        contributionType: "",
        description: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        // Handle form submission logic here
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className={classes.formItem}>
                <Label htmlFor="name" className={classes.label}>Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />
            </div>

            <div className={classes.formItem}>
                <Label htmlFor="email" className={classes.label}>Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
            </div>

            <div className={classes.formItem}>
                <Label htmlFor="contributionType" className={classes.label}>Contribution Type</Label>
                <Select
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, contributionType: value }))}
                >
                    <SelectTrigger id="contributionType" name="contributionType">
                        {formData.contributionType || "Select contribution type"}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="feature">Feature</SelectItem>
                        <SelectItem value="bugfix">Bug Fix</SelectItem>
                        <SelectItem value="documentation">Documentation</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className={classes.formItem}>
                <Label htmlFor="description" className={classes.label}>Description</Label>
                <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your contribution"
                />
            </div>

            <Button type="submit">Submit Contribution</Button>
        </form>
    );
}