import { Hono } from "hono";
import { createEndpoints } from "../../../factory/endpoint.factory";
import { getAppointmentById, getAppointments } from "../services/services";
import type { Endpoint } from "../../../types/endpoints";

const endpoints: Endpoint[] = [
    {
        path: "appointments",
        method: "GET",
        handler: getAppointments,
    },
    {
        path: "appointments/:id",
        method: "GET",
        handler: getAppointmentById,
    },
];

export const setupAppointmentControllers = (app: Hono) =>
    createEndpoints({ endpoints, app });
