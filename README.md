# PDF 内容读取MCP服务器

## 背景

MCP即模型上下文协议，是由Anthropic提出的开放协议，旨在规范向大语言模型提供上下文的方式，其发布可以见[这个页面](https://www.anthropic.com/news/model-context-protocol)，其官方网站是[这个网站](https://modelcontextprotocol.io/introduction)，中文网站是[这个网站](https://mcp-docs.cn/introduction)。

当前MCP开发，大多数的开发者集中在的是服务器的开发，这也是网上支持材料最多的，其中又以工具的开发最为广泛，其他的资源、提示词等，不是很有支持。理论上大语言模型都可以支持MCP，但要取得好的效果，往往需要大模型厂商特别训练，最佳的模型国际上当是Claude，而国内支持的较好的，有阿里的千问系列模型。

本项目即是一个简易的，支持读取PDF文件为文本的MCP服务器工具。

## 实现功能

本项目实现了一个MCP服务器，其有一个工具 `readPdf` ，通过传入PDF文件的绝对路径，可以提取出文本内容。我们使用了官方的 [`MCP TypeScript SDK`](https://github.com/modelcontextprotocol/typescript-sdk) 开发我们的 `MCP` 服务器，使用 [`pdfreader`](https://github.com/adrienjoly/npm-pdfreader) 解析PDF文件。实现参考了官方给出的示例以及[这篇博客](https://blog.laiweb.org/posts/ts-mcp-server.html)。

## 运行

安装依赖

```bash
npm i
```

编译 `TypeScript` 文件为 `JavaScript` 文件

```bash
npm run build
```

运行服务器

```bash
node dist/server.js
```

你应该可以看到服务器的正常运行（没有报错即可）。

## 使用示例

最新版（version 1.100）的[VS Code](https://code.visualstudio.com/)已经支持在[Copilot](https://code.visualstudio.com/docs/copilot/overview)直接使用MCP服务器了，具体的文档说明可以参考[这个文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)，这里我们就提供在[Copilot](https://code.visualstudio.com/docs/copilot/overview)上使用我们的MCP服务器的示例。

在 [.vscode](./.vscode) 目录下可以看到 [mcp.json](./.vscode/mcp.json) 文件，即为我们的MCP服务器配置，这里我们仅配置了工作区的使用，你也可以在用户层级设置。

```json
{
    "servers": {
        "my-mcp-server-3c0644eb": {
            "type": "stdio",
            "command": "node",
            "args": [
                "${workspaceFolder}/dist/server.js"
            ]
        }
    }
}
```

其中的 `my-mcp-server-3c0644eb` 为服务器的名称，你可以任意修改。其他的操作可以参考[博客](https://blog.laiweb.org/posts/ts-mcp-server.html)和[文档](https://code.visualstudio.com/docs/copilot/chat/mcp-servers)。
