const fs = require("fs");
fs.writeFileSync(
  "./src/environments/environment.ts",
  `
    export const environment = {
      apiUrl: '${process.env.API_URL}',
    };
  `
);
