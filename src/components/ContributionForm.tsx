
/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import React from "react";
import { useState } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import { Select, SelectItem, SelectTrigger, SelectContent } from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";

export default function ContributionForm() {
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
            <div>
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />
            </div>

            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />
            </div>

            <div>
                <Label htmlFor="contributionType">Contribution Type</Label>
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

            <div>
                <Label htmlFor="description">Description</Label>
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
