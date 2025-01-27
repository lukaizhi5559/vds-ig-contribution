/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { http, HttpResponse } from "msw";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Test Name", email: "test1@verizon.com", password: "password" },
];

// Generate mock data
const generateMockSubmissions = (numSubmissions) => {
  const statuses = ["in progress", "success", "error", "rejected"];

  const mockComments = (submissionId) => [
    {
      user: `User ${submissionId}-1`,
      timestamp: new Date(Date.now() - submissionId * 1000 * 60 * 60).toISOString(),
      text: `This is a comment on submission ${submissionId}.`,
    },
    {
      user: `User ${submissionId}-2`,
      timestamp: new Date(Date.now() - submissionId * 1000 * 60 * 45).toISOString(),
      text: `Another comment on submission ${submissionId}.`,
    },
  ];

  const mockActivityLogs = (submissionId) => [
    `Submission ${submissionId} created.`,
    `Submission ${submissionId} updated.`,
    `Submission ${submissionId} reviewed.`,
  ];

  return Array.from({ length: numSubmissions }, (_, index) => {
    const id = index + 1;
    return {
      id,
      title: `Submission Title ${id}`,
      description: `This is the description for submission ${id}.`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      createdAt: new Date(Date.now() - id * 1000 * 60 * 60 * 24).toISOString(),
      submittedBy: `User ${Math.ceil(id / 10)}`, // Group submissions by user
      comments: mockComments(id),
      activityLogs: mockActivityLogs(id),
      businessUseCase: `Business Use Case for submission ${id}`,
      componentOrigin: `https://example.com/component/${id}`,
      figmaFile: `https://www.figma.com/file/mockFile${id}`,
      figmaData: {
        usageGuideFrame: null,
        mainComponent: [],
        variantFrames: [],
        childNames: [],
        frameNodes: [],
        status: statuses[Math.floor(Math.random() * statuses.length)],
        message: [`Mock message for submission ${id}`],
        name: `Mock File ${id}`,
        thumbnailUrl: `https://example.com/thumbnail${id}.png`,
        lastModified: new Date(Date.now() - id * 1000 * 60 * 60 * 12).toISOString(),
      },
    };
  });
};

// Generate 50 mock submissions
let submissions = generateMockSubmissions(50);

// let submissions = [];

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
      figmaData,
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
      figmaData,
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
