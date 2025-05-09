import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from 'fs';
import { PdfReader } from "pdfreader";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "PdfReader",
  version: "1.0.0"
});

async function parsePdf(path: string): Promise<string> {
  let content = "";
  return new Promise((resolve, reject) => {
    new PdfReader().parseFileItems(path, (err, item) => {
      if (err) reject(err);
      else if (!item) resolve(content);
      else if (item.text) {
        content += item.text;
      }
    });
  });
}

const readPdfContent = async (path: string) => {
  if (!path) {
    return "Path is required";
  }
  try {
    if (!fs.existsSync(path)) {
      return `File not found: ${path}, please ensure that you use the absolute path`;
    }
  
    return await parsePdf(path);
  }
  catch (error) {
    return "Error reading file";
  }
}

// Add an addition tool
server.tool("readPdf",
  "read the content of a PDF file through giving the **absolute** path of the pdf file, the path parameter is the path to the PDF file",
  { path: z.string() },
  async ({ path }: { path: string }) => ({
    content: [{ type: "text", text: await readPdfContent(path) }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);