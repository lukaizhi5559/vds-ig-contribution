/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { http, HttpResponse } from "msw";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Test Name", email: "test1@verizon.com", password: "password" },
];

let submissions = [
  {
    id: 1,
    title: "Submission 1",
    description: "This is the first submission.",
    status: "Approved",
    createdAt: "2024-12-27T12:00:00Z",
  },
  {
    id: 2,
    title: "Submission 2",
    description: "This is the second submission.",
    status: "In Review",
    createdAt: "2024-12-26T12:00:00Z",
  },
  {
    id: 3,
    title: "Submission 3",
    description: "This is the third submission.",
    status: "Denied",
    createdAt: "2024-12-25T12:00:00Z",
  },
];

export const handlers = [
  // Get all users
  http.get("/api/users", () => {
    return HttpResponse.json(users, { status: 200 });
  }),

  // Get user by ID
  http.get("/api/users/:userId", ({ params }) => {
    const { userId } = params;
    const user = users.find((u) => u.id === parseInt(userId, 10));

    if (!user) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    return HttpResponse.json(user, { status: 200 });
  }),

  // Delete user by ID
  http.delete("/api/users/:userId", ({ params }) => {
    const { userId } = params;
    const userIndex = users.findIndex((u) => u.id === parseInt(userId, 10));

    if (userIndex === -1) {
      return HttpResponse.json({ error: "User not found" }, { status: 404 });
    }

    users.splice(userIndex, 1);
    return HttpResponse.json({ message: "User deleted" }, { status: 200 });
  }),

  // Create new user
  http.post("/api/users", async ({ request }) => {
    const { name, email, password } = await request.json();
    const newUser = { id: users.length + 1, name, email, password };
    users.push(newUser);

    return HttpResponse.json(newUser, { status: 201 });
  }),

  // Login user
  http.post("/api/users/login", async ({ request }) => {
    const { email, password } = await request.json();
    const userExists = users.find((u) => u.email === email && u.password === password);

    if (userExists) {
      return HttpResponse.json(userExists, { status: 201 });
    } else {
      return HttpResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }
  }),

  // Get all submissions
  http.get("/api/submissions", () => {
    return HttpResponse.json(submissions, { status: 200 });
  }),

  // Get a submission by ID
  http.get("/api/submissions/:submissionId", ({ params }) => {
    const { submissionId } = params;
    const submission = submissions.find((s) => s.id === parseInt(submissionId, 10));

    if (!submission) {
      return HttpResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return HttpResponse.json(submission, { status: 200 });
  }),

  // Create a new submission
  http.post("/api/submissions", async ({ request }) => {
    const { 
      title, 
      description, 
      status,
      businessUseCase,
      componentOrigin,
      figmaFile,
    } = await request.json();
  
    const newSubmission = {
      id: submissions.length + 1,
      title,
      description,
      status: status || "Pending",
      createdAt: new Date().toISOString(),
      businessUseCase,
      componentOrigin,
      figmaFile,
    };

    submissions.push(newSubmission);

    return HttpResponse.json(newSubmission, {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }),

  // Update submission info
  http.patch("/api/submissions/:submissionId", async ({ params, request }) => {
    const { submissionId } = params;
    const submissionUpdate = await request.json();
    const submission = submissions.find((s) => s.id === parseInt(submissionId, 10));

    submissions = submissions.map((s) => {
      if (s.id === parseInt(submissionId, 10)) {
        return { ...s, ...submissionUpdate };
      }

      return s;
    })

    if (!submission) {
      return HttpResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    return HttpResponse.json(submission, { status: 200 });
  }),

  // Update submission status
  http.patch("/api/submissions/status/:submissionId", async ({ params, request }) => {
    const { submissionId } = params;
    const { status } = await request.json();
    const submission = submissions.find((s) => s.id === parseInt(submissionId, 10));

    if (!submission) {
      return HttpResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    submission.status = status;
    return HttpResponse.json(submission, { status: 200 });
  }),

  // Delete a submission
  http.delete("/api/submissions/:submissionId", ({ params }) => {
    const { submissionId } = params;
    const submissionIndex = submissions.findIndex((s) => s.id === parseInt(submissionId, 10));

    if (submissionIndex === -1) {
      return HttpResponse.json({ error: "Submission not found" }, { status: 404 });
    }

    submissions.splice(submissionIndex, 1);
    return HttpResponse.json({ message: "Submission deleted" }, { status: 200 });
  }),
];
