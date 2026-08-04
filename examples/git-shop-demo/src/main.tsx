import React from "react"
import { createRoot } from "react-dom/client"
import { ThemeProvider } from "@mo-cloud/ui"
import { App } from "./App"

function Root() {
  const [mode, setMode] = React.useState<"light" | "dark">(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )

  React.useEffect(() => {
    // 监听系统主题变化
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onSystemChange = (e: MediaQueryListEvent) => setMode(e.matches ? "dark" : "light")
    mq.addEventListener("change", onSystemChange)

    // 监听宿主通过 postMessage 传来的主题（theme 消息或 auth 中的 theme 字段）
    const onMessage = (ev: MessageEvent) => {
      const d = ev.data
      if (!d || d.mo !== "bridge/v1") return
      if (d.kind === "theme" || (d.kind === "auth" && d.theme)) {
        setMode(d.theme === "dark" ? "dark" : "light")
      }
    }
    window.addEventListener("message", onMessage)

    return () => {
      mq.removeEventListener("change", onSystemChange)
      window.removeEventListener("message", onMessage)
    }
  }, [])

  return (
    <ThemeProvider key={mode} defaultMode={mode}>
      <App />
    </ThemeProvider>
  )
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)
