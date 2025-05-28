const getPathCommandsAsArray = (pathString) => {
    const commands = pathString.split(/\s(?=[A-Z])/); // Split on spaces before a command letter (e.g., "M", "C", "L")
    const pathVariants = [];
    let currentPath = ""; 

    commands.forEach((cmd) => {
        currentPath += ` ${cmd.trim()}`;            // Append new command to previous path
        pathVariants.push(currentPath.trim());      // Store the updated path
    });

    return pathVariants; // Return full animation sequence
}

export default getPathCommandsAsArray;