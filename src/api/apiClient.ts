type RequestOptions = {
    method?: string;
    body?: any;
    headers?: Record<string, string>;
};

export const apiClient = async <T>(
    url: string,
{ method = "GET", body, headers = {} }: RequestOptions = {}
): Promise<T> => {
    const response = await fetch(url, {
        method,
        headers: {
        "Content-Type": "application/json",
        ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
        `Error ${response.status}: ${response.statusText} - ${errorMessage}`
        );
    }

    return response.json();
};
  