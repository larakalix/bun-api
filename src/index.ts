import { Hono } from "hono";
import { serveStatic } from "hono/serve-static.bun";
import { setupAppointmentControllers } from "./modules/appointment/controllers/controller";
import { setupProductControllers } from "./modules/product/controllers/controller";

const port = parseInt(process.env.PORT) || 3000;
const app = new Hono();

app.use("/favicon.ico", serveStatic({ path: "./public/favicon.ico" }));

app.get("/", (c) => {
    return c.json({ message: "Hello World!" });
});

// Setup controllers
setupProductControllers(app);
setupAppointmentControllers(app);

console.log(`Running at http://localhost:${port}`);

export default {
    port,
    fetch: app.fetch,
};
