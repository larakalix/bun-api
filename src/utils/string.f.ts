export const isPlural = (moduleName: string): boolean => {
    const lastCharacter = moduleName.slice(-1);
    if (lastCharacter === "s") return true;

    return false;
};
