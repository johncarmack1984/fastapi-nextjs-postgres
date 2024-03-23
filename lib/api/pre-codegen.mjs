// @ts-check
import * as fs from "fs";
import fetch from "node-fetch";

const fileName = "openapi.json";
const serverFilePath = `http://127.0.0.1:8000/${fileName}`;
const localFilePath = `lib/api/${fileName}`;

async function fetchAndWriteJson() {
  try {
    const response = await fetch(serverFilePath);
    const json = await response.json();
    fs.writeFileSync(localFilePath, JSON.stringify(json, null, 2));
    console.log("File written successfully");
  } catch (error) {
    console.error("Error:", error);
  }
}

/**
 * @param {fs.PathLike | fs.promises.FileHandle} filePath
 */
async function modifyOpenAPIFile(filePath) {
  try {
    const data = await fs.promises.readFile(localFilePath, "utf8");
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
      JSON.stringify(openapiContent, null, 2),
    );
    console.log("File successfully modified");
  } catch (err) {
    console.error("Error:", err);
  }
}

await fetchAndWriteJson();
await modifyOpenAPIFile(localFilePath);
