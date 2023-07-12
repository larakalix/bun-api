import { Command } from "commander";
import { Module } from "./cli/Module";

const program = new Command();

program
    .version("1.0.0")
    .description("CLI tool to generate new modules in a Bun application");

program.command("m <moduleName>").action(async (moduleName: string) => {
    const generator = new Module();
    await generator.generateModule(moduleName);

    console.log(`Module ${moduleName} generated successfully!`);
});

// program.command("c <controllerName>").action(async (controllerName: string) => {
//     console.log(`Controller ${controllerName} generated successfully!`);
// });

program.parse(process.argv);