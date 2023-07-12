import type { Context } from "hono";
import type { Environment } from "hono/dist/types/types";

export type Handler = (c: Context<string, Environment, unknown>) => Response;

export type Endpoint = {
    path: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    handler: Handler;
};
