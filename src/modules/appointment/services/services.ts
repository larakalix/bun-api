import type { Context } from "hono";
import type { Environment } from "hono/dist/types/types";
import type { Appointment } from "../types/types";

const appointments: Appointment[] = [
    { id: "123-123", name: "John Doe", description: "Number 9" },
    { id: "234-234", name: "Samuel Jackon", description: "No number" },
    { id: "746-746", name: "Zlatan Ibrahimovic", description: "Number 10" },
];

export const getAppointments = (
    c: Context<string, Environment, unknown>
): Response => {
    return c.json({ appointments });
};

export const getAppointmentById = (
    c: Context<string, Environment, unknown>
): Response => {
    const { id } = c.req.param();
    const appointment = appointments.find((a) => a.id === id);

    if (!appointment)
        return c.json({ error: "Appointment not found", code: 404 });

    return c.json({ appointment, code: 200 });
};
