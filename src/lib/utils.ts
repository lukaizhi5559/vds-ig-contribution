/*!
 * Copyright (C) Verizon. All rights reserved.
 */

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isDev() {
  return process.env.NODE_ENV === "development"
}

export function getInitials(name: string | undefined) {
  if (!name) return ""; // Handle empty or undefined names
  
  return name
    .split(" ") // Split the name by spaces
    .map(part => part.charAt(0).toUpperCase()) // Get the first letter of each part and make it uppercase
    .join(""); // Join the initials together
}

export const extractFileKey = (fileKeyOrUrl: string): string => {
    if (!fileKeyOrUrl) return ""

    // Match for the format "design/<fileKey>/"
    const urlPattern = /design\/([a-zA-Z0-9]+)\//
    const match = fileKeyOrUrl.match(urlPattern)

    return match ? match[1] : fileKeyOrUrl
}

// Helper function to extract submitter_id from JWT token
export const getSubmitterIdFromToken = (accessToken: string | undefined): number | undefined => {
  try {
    if (accessToken === undefined) return undefined

    const payloadBase64 = accessToken.split(".")[1]; // Extract payload part
    const payloadJson = atob(payloadBase64); // Decode Base64
    const { sub } = JSON.parse(payloadJson); // Parse as JSON

    return Number(sub); // Convert to number
  } catch (error) {
    console.error("Invalid JWT:", error);
    return undefined;
  }
}
