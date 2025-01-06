/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { http, HttpResponse } from "msw";

const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
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
    const { name, email } = await request.json();
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);

    return HttpResponse.json(newUser, { status: 201 });
  }),
];
