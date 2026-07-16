import * as React from "react"
import {
  type ThemeTokens,
  lightTokens,
  darkTokens,
  tokensToCssVars,
} from "./tokens"

/* ── Context ── */

export type ThemeMode = "light" | "dark"

export interface ThemeContextValue {
  mode: ThemeMode
  setMode: (mode: ThemeMode) => void
  tokens: ThemeTokens
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null)

/* ── Provider ── */

export interface ThemeProviderProps {
  /**
   * 初始主题模式，默认 "light"。
   * 设为 "auto" 时自动检测宿主 <html class="dark"> 并跟随切换。
   */
  defaultMode?: ThemeMode | "auto"
  children: React.ReactNode
}

export function ThemeProvider({
  defaultMode = "light",
  children,
}: ThemeProviderProps) {
  const isAuto = defaultMode === "auto"

  const [mode, setMode] = React.useState<ThemeMode>(() => {
    if (!isAuto) return defaultMode as ThemeMode
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light"
    }
    return "light"
  })

  // auto 模式：监听宿主 <html class="dark"> 变化
  React.useEffect(() => {
    if (!isAuto || typeof document === "undefined") return

    const detect = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setMode(isDark ? "dark" : "light")
    }

    detect()

    const observer = new MutationObserver(detect)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [isAuto])

  const tokens = mode === "dark" ? darkTokens : lightTokens
  const cssVars = React.useMemo(() => tokensToCssVars(tokens), [tokens])

  const ctx = React.useMemo<ThemeContextValue>(
    () => ({ mode, setMode, tokens }),
    [mode, tokens]
  )

  return (
    <ThemeContext.Provider value={ctx}>
      <div style={cssVars as React.CSSProperties}>{children}</div>
    </ThemeContext.Provider>
  )
}

/* ── Hook ── */

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext)
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>")
  }
  return ctx
}
