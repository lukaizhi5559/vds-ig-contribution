export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
};

export type LoginUser = {
    access_token: string;
    status: string;
    token_type: string;
}