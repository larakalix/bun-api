import { Command } from "commander";
import { Module } from "./Module";

const program = new Command();
const generator = new Module();

program
    .version("1.0.0")
    .description("CLI tool to generate new modules in a Bun application");

program.command("m <moduleName>").action(async (moduleName: string) => {
    await generator.generateModule(moduleName);
    console.log(`Module ${moduleName} generated successfully!`);
});

program.command("module <moduleName>").action(async (moduleName: string) => {
    await generator.generateModule(moduleName);
    console.log(`Module ${moduleName} generated successfully!`);
});

// program.command("c <controllerName>").action(async (controllerName: string) => {
//     console.log(`Controller ${controllerName} generated successfully!`);
// });

program.parse(process.argv);
