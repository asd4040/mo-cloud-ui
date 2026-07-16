# @mo-cloud/ui 集成指南

## 1. 获取 SDK

从 GitHub 下载：https://github.com/asd4040/mo-cloud-ui

下载 zip 并解压，或 `git clone`。

## 2. 放入项目

将下载的文件夹放到项目中（如 `libs/mo-cloud-ui/`）：

```
你的项目/
├── libs/
│   └── mo-cloud-ui/
│       ├── package.json
│       ├── dist/
│       ├── src/
│       └── ...
├── src/
├── package.json
```

## 3. 安装依赖

```bash
# npm
npm install ./libs/mo-cloud-ui

# pnpm
pnpm add ./libs/mo-cloud-ui
```

安装后 `package.json` 会出现：

```json
{
  "dependencies": {
    "@mo-cloud/ui": "file:libs/mo-cloud-ui"
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

## 6. 更新 SDK

1. 从 GitHub 重新下载最新版
2. 替换 `libs/mo-cloud-ui/` 目录
3. 运行 `npm install` 重新链接
