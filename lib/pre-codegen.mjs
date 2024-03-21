import * as fs from "fs";
import fetch from "node-fetch";

const filePath = "openapi.json";

async function fetchAndWriteJson() {
  try {
    const response = await fetch(`http://localhost:8000/${filePath}`);
    const json = await response.json();
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2));
    console.log("File written successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

async function modifyOpenAPIFile(filePath) {
  try {
    const data = await fs.promises.readFile(filePath);
    const openapiContent = JSON.parse(data);

    const paths = openapiContent.paths;
    for (const pathKey of Object.keys(paths)) {
      const pathData = paths[pathKey];
      for (const method of Object.keys(pathData)) {
        const operation = pathData[method];
        if (operation.tags && operation.tags.length > 0) {
          const tag = operation.tags[0];
          const operationId = operation.operationId;
          const toRemove = `${tag}-`;
          if (operationId.startsWith(toRemove)) {
            const newOperationId = operationId.substring(toRemove.length);
            operation.operationId = newOperationId;
          }
        }
      }
    }

    await fs.promises.writeFile(
      filePath,
      JSON.stringify(openapiContent, null, 2)
    );
    console.log("File successfully modified");
  } catch (err) {
    console.error("Error:", err);
  }
}

await fetchAndWriteJson();
await modifyOpenAPIFile(`./${filePath}`);
