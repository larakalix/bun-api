import { join } from "path";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { createSubFolders, updateIndexFile } from "./methods";

export class Module {
    async generateModule(moduleName: string): Promise<void> {
        // Create the module directory
        const modulePath = join(
            process.cwd(),
            "src",
            "modules",
            moduleName.toLowerCase()
        );

        if (existsSync(modulePath)) {
            console.error(
                `A module with the name "${moduleName}" already exists.`
            );
            return;
        }

        mkdirSync(modulePath, { recursive: true });
        createSubFolders(modulePath, ["controllers", "services", "types"]);

        const typesFolderPath = join(modulePath, "types");
        const servicesFolderPath = join(modulePath, "services");
        const controllersFolderPath = join(modulePath, "controllers");

        const fileConfigs = [
            {
                filePath: join(typesFolderPath, "type.d.ts"),
                fileContent:
                    `import type { Identifier } from "../../../types/generic"

                export type ${moduleName} = Identifier & {};
                `
                        .replace(/^[ \t]+/gm, "")
                        .trim(),
            },
            {
                filePath: join(servicesFolderPath, "services.ts"),
                fileContent: `
                import type { Context } from "hono";
                import type { Environment } from "hono/dist/types/types";
                import type { ${moduleName} } from "../types/type";
          
                const ${moduleName.toLowerCase()}s: ${moduleName}[] = [];
          
                export const get${moduleName}s = (c: Context<string, Environment, unknown>): Response => {
                  return c.json({ ${moduleName.toLowerCase()}s });
                };
                `
                    .replace(/^[ \t]+/gm, "")
                    .trim(),
            },
            {
                filePath: join(controllersFolderPath, "controller.ts"),
                fileContent: `
                import { Hono } from "hono";
                import { createEndpoints } from "../../../factory/endpoint.factory";
                import { get${moduleName}s } from "../services/services";
                import type { Endpoint } from "../../../types/endpoints";
          
                const endpoints: Endpoint[] = [{ method: "GET", path: "/${moduleName.toLowerCase()}s", handler: get${moduleName}s },];
          
                export const setup${moduleName}Controllers = (app: Hono) => createEndpoints({ endpoints, app });
              `
                    .replace(/^[ \t]+/gm, "")
                    .trim(),
            },
        ];

        fileConfigs.forEach(({ fileContent, filePath }) => {
            writeFileSync(filePath, fileContent);
        });

        updateIndexFile(moduleName);
    }
}
