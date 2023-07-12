import type { Context } from "hono";
import type { Environment } from "hono/dist/types/types";
import type { Product } from "../types/type";

const products: Product[] = [
    { id: "1", name: "Product 1", price: 100 },
    { id: "2", name: "Product 2", price: 200 },
    { id: "3", name: "Product 3", price: 300 },
];

export const getProducts = (
    c: Context<string, Environment, unknown>
): Response => {
    return c.json({ products });
};
