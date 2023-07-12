import type { Identifier } from "../../../types/generic";

export type Appointment = Identifier & {
    name: string;
    description: string;
};
