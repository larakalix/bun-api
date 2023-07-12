import { Hono } from "hono";
import type { Endpoint } from "../types/endpoints";

type FactoryProps = {
    endpoints: Endpoint[];
    app: Hono;
};

export const createEndpoints = ({ endpoints, app }: FactoryProps) => {
    endpoints.forEach(({ method, path, handler }) => {
        const URI = path.startsWith("/api/") ? path : `/api/${path}`;

        switch (method) {
            case "GET":
                app.get(URI, handler);
                break;
            case "POST":
                app.post(URI, handler);
                break;
            case "PUT":
                app.put(URI, handler);
                break;
            case "DELETE":
                app.delete(URI, handler);
                break;
            default:
                throw new Error(`Invalid HTTP method: ${method}`);
        }
    });
};
