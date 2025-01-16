/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import * as React from "react";
import {
  createRouter,
  Route,
  createRootRoute,
} from "@tanstack/react-router";
import { Shell } from "@/Shell";
import Portal from "@/components/pages/Portal";
import ContributionDashboard from "@/components/pages/ContributionDashboard";
import SubmissionDetailView from "@/components/pages/SubmissionDetailView";
import AuthLogin from "@/components/pages/AuthLogin";

// Create the root route with a layout for all child routes
const rootRoute = createRootRoute({
  component: Shell
});

const portalRoute = new Route({
  path: "/",
  component: Portal,
  getParentRoute: () => rootRoute,
});

const contributionRoute = new Route({
  path: "/contribution",
  component: ContributionDashboard,
  getParentRoute: () => rootRoute,
});

const submissionDetailRoute = new Route({
  path: "/submission-detail",
  component: SubmissionDetailView,
  getParentRoute: () => rootRoute,
});

const loginRoute = new Route({
  path: "/login",
  component: AuthLogin,
  getParentRoute: () => rootRoute,
});

const routeTree = (rootRoute as any).addChildren([
  portalRoute,
  contributionRoute,
  submissionDetailRoute,
  loginRoute,
]);

// Create the router with a root route
export const router = createRouter({ routeTree });
