/*!
 * Copyright (C) Verizon. All rights reserved.
 */

interface ImportMetaWithEnv extends ImportMeta {
    env: {
        VITE_BACKEND_API_TOKEN: string;
    };
}

type RequestInit = {
    method?: string;
    mode?: string,
    body?: any;
    headers?: Record<string, string>;
};

const BASE_URL = "https://verizon.hiddenplanet.io/vds-cont/api/v1";
const AUTH_TOKEN = (import.meta as ImportMetaWithEnv).env.VITE_BACKEND_API_TOKEN || "";

export async function apiClient<T>(
  endpoint: string,
  { method = "GET", body, headers = {} }: RequestInit = {},
  queryKey?: string
): Promise<T> {
    // Determine Content-Type
    const isFormData = headers["Content-Type"] === "application/x-www-form-urlencoded";

    const requestOptions: RequestInit = {
        method,
        mode: "cors",
        headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`, // Include Bearer token
            "Content-Type": isFormData ? "application/x-www-form-urlencoded" : "application/json",
            ...headers, // Merge additional headers
        },
        body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
    };

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, requestOptions);
        const responseText = await response.text();
        
        if (!response.ok) {
            console.error("API Error:", response.status, response.statusText, responseText);
            throw new Error(`Error ${response.status}: ${response.statusText} - ${responseText}`);
        }

        return responseText ? JSON.parse(responseText) : ({} as T);
    } catch (error) {
        console.error("Network/API Request Failed:", error);
        throw error;
    }
}