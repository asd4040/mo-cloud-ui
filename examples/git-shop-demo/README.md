# MoCloud 商城 Demo

这是一个可直接运行的 React + TypeScript + Vite 示例，演示：

- 使用 `@mo-cloud/ui` 创建商城界面
- 使用 `@mocloud/frontend-sdk` 获取宿主上下文并调用 Capability
- 配置 `public/mo-app.json`
- 构建可上传到 MoCloud 的 `dist`

## 启动

```bash
pnpm install
pnpm dev
```

浏览器打开终端显示的本地地址。在普通浏览器中运行时，Demo 使用内置 Mock 商品数据；嵌入 MoCloud 后会通过 Bridge 调用声明的 Capability。

## 构建

```bash
pnpm build
```

构建完成后，将整个 `dist` 目录上传到 MoCloud。

主要修改位置：

- `src/App.tsx`：UI 和业务交互
- `public/mo-app.json`：应用与 Capability 声明
