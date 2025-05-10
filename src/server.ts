import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import fs from 'fs';
import { readPdfContent as readPdfContentFromPath, readPdfContentWithUrl } from "./utils";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "PdfReader",
  version: "1.0.0"
});

// Add an addition tool
server.tool("readPdfFromPath",
  "read the content of a PDF file through giving the **absolute** path of the pdf file, the path parameter is the path to the PDF file",
  { path: z.string() },
  async ({ path }: { path: string }) => ({
    content: [{ type: "text", text: await readPdfContentFromPath(path) }]
  })
);

server.tool("readPdfFromUrl",
  "read the content of a PDF file through giving the url of the pdf file, the url parameter is the url to the PDF file",
  { url: z.string() },
  async ({ url }: { url: string }) => ({
    content: [{ type: "text", text: await readPdfContentWithUrl(url) }]
  })
);

server.tool("readArxivPaper",
  "read the content of a paper from arxiv through giving the id of the paper, such as 2301.00001",
  { id: z.string() },
  async ({ id }: { id: string }) => ({
    content: [{
      type: "text",
      text: await readPdfContentWithUrl(`https://arxiv.org/pdf/${id}.pdf`)
    }]
  })
)

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);