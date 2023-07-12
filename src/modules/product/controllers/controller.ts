import { Hono } from "hono";
import { createEndpoints } from "../../../factory/endpoint.factory";
import { getProducts } from "../services/services";
import type { Endpoint } from "../../../types/endpoints";

const endpoints: Endpoint[] = [
    { method: "GET", path: "products", handler: getProducts },
];

export const setupProductControllers = (app: Hono) =>
    createEndpoints({ endpoints, app });
