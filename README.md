# MoCloud 前端开发包

本仓库包含两个可以独立安装的包：

| 目录 | 包名 | 用途 |
|---|---|---|
| 仓库根目录 | `@mo-cloud/ui` | React UI 组件和主题 |
| `frontend-sdk/` | `@mocloud/frontend-sdk` | iframe Bridge、能力调用和本地 Mock |

> [!IMPORTANT]
> 本仓库当前只对 **React + TypeScript + Vite + pnpm** 项目提供官方支持。请不要把 `@mo-cloud/ui` 用在 Vue、Angular、Svelte、Next.js 服务端组件或其他未经验证的框架中。

## 官方支持范围

| 项目 | 支持版本 |
|---|---|
| Node.js | 20、22 |
| pnpm | 10、11 |
| React | 18、19 |
| React DOM | 与 React 相同主版本 |
| TypeScript | 5.7 及以上 |
| Vite | 6、7 |

- `@mo-cloud/ui` 是 React UI 组件库，必须在 React 项目中使用。
- `@mocloud/frontend-sdk` 是浏览器端 JavaScript Bridge，但官方示例和测试当前只覆盖 React + Vite。
- 不支持在 Node.js 服务端执行依赖 `window` 的 Bridge API。
- 不建议使用 npm、yarn 或 bun 安装本仓库的本地源码包；文档和锁文件统一以 pnpm 为准。

## 1. 下载

从 GitHub 下载：https://github.com/asd4040/mo-cloud-ui

下载 zip 并解压，或 `git clone`。

## 2. 放入项目

将下载的完整文件夹放到项目中（如 `libs/mo-cloud-ui/`）：

```
你的项目/
├── libs/
│   └── mo-cloud-ui/
│       ├── package.json
│       ├── frontend-sdk/
│       ├── dist/
│       ├── src/
│       └── ...
├── src/
├── package.json
```

## 3. 安装 UI 和 Frontend SDK

```bash
pnpm add ./libs/mo-cloud-ui
pnpm add ./libs/mo-cloud-ui/frontend-sdk
```

安装后 `package.json` 会出现：

```json
{
  "dependencies": {
    "@mo-cloud/ui": "file:libs/mo-cloud-ui",
    "@mocloud/frontend-sdk": "file:libs/mo-cloud-ui/frontend-sdk"
  }
}
```

## 4. 基本使用

### 4.1 包裹 ThemeProvider

```tsx
import { ThemeProvider } from '@mo-cloud/ui'

function App() {
  return (
    <ThemeProvider defaultMode="light">
      <YourPage />
    </ThemeProvider>
  )
}
```

`defaultMode` 可选值：
- `"light"` — 亮色模式
- `"dark"` — 暗色模式
- `"auto"` — 自动跟随宿主 `<html class="dark">`

### 4.2 使用组件

```tsx
import {
  MoButton,
  MoCard, MoCardHeader, MoCardTitle, MoCardContent, MoCardFooter,
  MoBadge,
  MoInput,
  MoSelect,
  MoLabel,
  MoCheckbox,
  MoRadio,
  MoSwitch,
  MoTextarea,
  MoSkeleton,
} from '@mo-cloud/ui'
```

### 4.3 切换主题

```tsx
import { useTheme } from '@mo-cloud/ui'

function ThemeToggle() {
  const { mode, setMode } = useTheme()
  return (
    <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
      切换主题
    </button>
  )
}
```

## 5. 可用组件一览

| 组件 | 说明 |
|------|------|
| `MoButton` | 按钮（variant: default/primary/ghost/danger/link，size: sm/default/lg/icon） |
| `MoCard` | 卡片容器 |
| `MoCardHeader` | 卡片头部 |
| `MoCardTitle` | 卡片标题 |
| `MoCardContent` | 卡片内容区 |
| `MoCardFooter` | 卡片底部 |
| `MoBadge` | 徽章（variant: default/ok/warn/danger/info/secondary） |
| `MoInput` | 输入框 |
| `MoTextarea` | 多行文本框 |
| `MoSelect` | 下拉选择 |
| `MoCheckbox` | 复选框 |
| `MoRadio` | 单选框 |
| `MoSwitch` | 开关 |
| `MoLabel` | 表单标签 |
| `MoSkeleton` | 骨架屏占位 |
| `ThemeProvider` | 主题提供者 |
| `useTheme` | 主题 Hook（获取/切换 mode） |

## 6. 调用 MoCloud 宿主能力

`frontend-sdk` 负责 Bridge 握手、请求 ID、超时、响应匹配和本地 Mock。业务页面不需要手写 `postMessage`：

```tsx
import { bridge } from '@mocloud/frontend-sdk'

const context = await bridge.getContext()
const result = await bridge.invokeCapability('get_products', {
  keyword: '手机',
})

if (result.status === 'ok') {
  console.log(result.output)
}
```

常用 API：

```ts
bridge.getContext()
bridge.invokeCapability('capability_id', args)
bridge.ui.open()
bridge.ui.resize(600, 800)
bridge.ui.close()
bridge.track('event_name', payload)
```

直接在普通浏览器打开页面时，SDK 会进入 Mock 模式；嵌入 MoCloud iframe 后会自动连接宿主。

完整说明见 [`frontend-sdk/FRONTEND_SDK_GUIDE.md`](frontend-sdk/FRONTEND_SDK_GUIDE.md)。

## 7. 更新 SDK

1. 从 GitHub 重新下载最新版
2. 替换 `libs/mo-cloud-ui/` 目录
3. 运行 `npm install` 重新链接

## 8. 仓库构建

```bash
pnpm install
pnpm --dir frontend-sdk install
pnpm build:all
```
