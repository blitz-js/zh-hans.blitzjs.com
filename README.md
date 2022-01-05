# Blitzjs.com - 网站 & 文档

### 安装方式

```bash
yarn
```

### 本地开发

```bash
yarn dev
```

该命令开启了一个本地服务器，并且打开一个浏览器窗口。大多数改动都会实时被热更新，无需重启服务器。

### 部署

`main` 分支将被持续部署到 https://zh-hans.blitzjs.com 上。

## 语言翻译

更多信息详见 [blitzjs.com-translation](https://github.com/blitz-js/blitzjs.com-translation/blob/main/README.md)！

## 代码语法高亮

代码块使用 [Prism](https://prismjs.com/) 库来高亮显示语法。你可以使用 `// highlight-start` `// highlight-end` 注释来开始高亮和结束高亮一段指定范围的代码块，或使用 `// highlight-line` 来高亮单行代码块。

```js
const example = "not highlighted"
// highlight-start
const highlighted = true
// highlight-end
const notHighlighted = true
const alsoHighlighted = true // highlight-line
```

## 段柄

所有 H2 和 H3（或所有以 `##` 或 `###` 开头的标题）需要一个自定义的 _段柄_，其位于 URL 的最后一部分：

```
                                     |  这一部分  |
https://blitzjs.com/docs/get-started#install-blitz
```

你可以通过如下方式添加：

```md
### 安装 Blitz {#install-blitz}
```

还有些更多的规范：

- 所有比 H3 更小的标题（或开头有比 `###` 更长的文本）不应该设置段柄。
- 段柄需要全为小写且只能允许使用 26 个英文字母和数字符号。
- 请使用 `-` 来替换空格。
- 在同一份文档中一定不能出现两个完全相同的段柄。如果你有两个完全相同的标题，可在结尾增加一个数字来区分（或其他方式区分）。

例如：

```md
### 安装 Blitz {#install-blitz}

### 安装 Blitz {#install-blitz-1}

#### 安装 Blitz

## 安装 Blitz {#install-blitz-2}
```

如果你不完全确定段柄应该是什么样子，或只是想自动化该过程，可运行 `yarn english-slugify`。

## 卡片

你可以使用卡片，正如 [_API 路由_](https://blitzjs.com/docs/api-routes) 开头的那样：

```md
<Card type="info">

与 Next.js 不同，你的 `api/` 文件夹应该是 `pages/` 的同级，而不是嵌套在里面。但是为了与 Next.js 兼容，仍然支持使用 `pages/api`。

</Card>
```

属性:

- `type`: `'caution' | 'info' | 'note'`
- `title`: `string` (可选的)

**切记留下一个空行** 在组件标签和内容之间，正如上方的例子所示。
