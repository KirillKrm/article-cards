const fs = require("fs");
const path = require("path");

const filePath = "./src/environments/environment.ts";
const directory = path.dirname(filePath);

if (!fs.existsSync(directory)) {
  fs.mkdirSync(directory, { recursive: true });
}

fs.writeFileSync(
  filePath,
  `
    export const environment = {
      apiUrl: '${process.env.API_URL}',
    };
  `
);
