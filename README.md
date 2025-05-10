# PDF 内容读取MCP服务器

## 背景

MCP即模型上下文协议，是由Anthropic提出的开放协议，旨在规范向大语言模型提供上下文的方式，其发布可以见[这个页面](https://www.anthropic.com/news/model-context-protocol)，其官方网站是[这个网站](https://modelcontextprotocol.io/introduction)，中文网站是[这个网站](https://mcp-docs.cn/introduction)。

当前MCP开发，大多数的开发者集中在的是服务器的开发，这也是网上支持材料最多的，其中又以工具的开发最为广泛，其他的资源、提示词等，不是很有支持。理论上大语言模型都可以支持MCP，但要取得好的效果，往往需要大模型厂商特别训练，最佳的模型国际上当是Claude，而国内支持的较好的，有阿里的千问系列模型。

本项目即是一个简易的，支持读取PDF文件或链接为文本的MCP服务器工具。

## 实现功能

本项目实现了一个MCP服务器，其有一个工具 `readPdfFromPath` ，通过传入PDF文件的绝对路径，可以提取出文本内容，有一个工具 `readPdfFromUrl` 从链接读取PDF文件内容，有一个工具 `readArxivPaper` 从 ArXiv 编号读取文件内容。我们使用了官方的 [`MCP TypeScript SDK`](https://github.com/modelcontextprotocol/typescript-sdk) 开发我们的 `MCP` 服务器，使用 [`pdf-parser`](https://www.npmjs.com/package/pdf-parse) 解析PDF文件，使用了 [axios](https://www.npmjs.com/package/axios) 获取链接内容。实现参考了官方给出的示例以及[这篇博客](https://blog.laiweb.org/posts/ts-mcp-server.html)。

## 运行

首先我们需要安装 [`bun`](https://bun.sh/) 。使用命令

```bash
curl -fsSL https://bun.sh/install | bash
```

安装 `bun` 。

> 相比 `npm` ， `bun` 速度更快，但对 `Node.js` 的模拟不是很好，很可能遇到各种问题，这里之所以使用 `bun` ，是因为有一个兼容性问题更大的[Cherry Studio](https://www.cherry-ai.com/)，尽管它声称支持 `npm` ，但实际测试发现， `npm` 很容易遇到各种问题，往往需要使用 `bun` 。

安装依赖

```bash
bun install
```

运行服务器

```bash
bun run start
```

你应该可以看到服务器的正常运行（没有报错即可）。

## 使用示例

### VS Code Copilot

最新版（version 1.100）的[VS Code](https://code.visualstudio.com/)已经支持在[Copilot](https://code.visualstudio.com/docs/copilot/overview)直接使用MCP服务器了，具体的文档说明可以参考[这个文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)，这里我们就提供在[Copilot](https://code.visualstudio.com/docs/copilot/overview)上使用我们的MCP服务器的示例。

在 [.vscode](./.vscode) 目录下可以看到 [mcp.json](./.vscode/mcp.json) 文件，即为我们的MCP服务器配置，这里我们仅配置了工作区的使用，你也可以在用户层级设置。

```json
{
    "servers": {
        "my-mcp-server-3c0644eb": {
            "type": "stdio",
            "command": "bun",
            "args": [
                "run",
                "--cwd",
                "${workspaceFolder}",
                "start"
            ]
        }
    }
}
```

其中的 `my-mcp-server-3c0644eb` 为服务器的名称，你可以任意修改。其他的操作可以参考[博客](https://blog.laiweb.org/posts/ts-mcp-server.html)和[文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)。

### Cherry Studio

[Cherry Studio](https://www.cherry-ai.com/)是一个AI助手平台，支持MCP协议，我们使用它集成我们的MCP服务器。我们不在这里提供详细的操作，具体的使用可以参考[文档](https://docs.cherry-ai.com/)，文档系中文文档，阅读起来应该没有太大的难度。文档中关于MCP服务器的介绍（见[这里](https://docs.cherry-ai.com/advanced-basic/mcp)），基本是使用的远程的写好的服务器，而对于本地自行开发的服务器没有相关说明，这里给出我们的配置：

```json
{
  "mcpServers": {
    "PDF-reader": {
      "name": "PDF阅读器",
      "type": "stdio",
      "description": "阅读PDF文件",
      "isActive": true,
      "registryUrl": "https://registry.npmmirror.com",
      "command": "bun",
      "args": [
        "run",
        "--cwd",
        "/path/to/your/mcp/server",
        "start"
      ]
    }
  }
}
```

其中 `/path/to/your/mcp/server` 是本项目的根目录的路径。
