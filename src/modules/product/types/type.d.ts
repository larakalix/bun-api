import type { Identifier } from "../../../types/generic";

export type Product = Identifier & {
    name: string;
    price: number;
};
