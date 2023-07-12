import { join } from "path";
import { mkdirSync, writeFileSync, readFileSync } from "fs";

export const createSubFolders = (
    modulePath: string,
    subFolders: string[]
): void => {
    subFolders.forEach((folder) => {
        const folderPath = join(modulePath, folder);
        mkdirSync(folderPath, { recursive: true });
    });
};

const addImport = (indexFilePath: string, moduleName: string): void => {
    const indexFileContent = readFileSync(indexFilePath, "utf-8");
    const lastImportIndex = indexFileContent.lastIndexOf("import");
    const insertPosition = indexFileContent.indexOf("\n", lastImportIndex) + 1;

    const updatedIndexFileContent =
        indexFileContent.slice(0, insertPosition) +
        `import { setup${moduleName}Controllers } from "./modules/${moduleName.toLowerCase()}/controllers/controller";\n` +
        indexFileContent.slice(insertPosition);

    writeFileSync(indexFilePath, updatedIndexFileContent);
};

const addModule = (indexFilePath: string, moduleName: string): void => {
    const indexFileContent = readFileSync(indexFilePath, "utf-8");
    const setupControllersIndex = indexFileContent.indexOf("// Setup controllers");
    const insertPosition =indexFileContent.indexOf("\n", setupControllersIndex) + 1;

    const updatedIndexFileContent =
        indexFileContent.slice(0, insertPosition) +
        `setup${moduleName}Controllers(app);\n` +
        indexFileContent.slice(insertPosition);

    writeFileSync(indexFilePath, updatedIndexFileContent);
};

export const updateIndexFile = (moduleName: string): void => {
    const indexFilePath = join(process.cwd(), "src", "index.ts");

    addImport(indexFilePath, moduleName);
    addModule(indexFilePath, moduleName);
};
