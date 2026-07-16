/**
 * 设计令牌 — 固定匹配 entry 设计系统，不支持自定义。
 * 色值从 web/entry/src/index.css 的 :root / .dark 中提取。
 */

export interface ThemeTokens {
  /* 背景/表面 */
  bg: string
  surface: string
  "surface-2": string

  /* 边框 */
  border: string
  "border-strong": string

  /* 文字 */
  text: string
  "text-2": string
  "text-3": string

  /* 品牌主色 */
  primary: string
  "primary-weak": string
  "primary-text": string

  /* 语义色 */
  ok: string
  "ok-bg": string
  warn: string
  "warn-bg": string
  info: string
  "info-bg": string
  muted: string
  "muted-bg": string
  danger: string
  "danger-bg": string

  /* 圆角 */
  radius: string
  "radius-sm": string
  "radius-lg": string
  "radius-xl": string
}

/** Light 模式 — 对齐 entry :root */
export const lightTokens: ThemeTokens = {
  bg: "#f6f7fb",
  surface: "#ffffff",
  "surface-2": "#f6f7fb",

  border: "#e7e9f1",
  "border-strong": "#d6d9e4",

  text: "#0f1320",
  "text-2": "#5b6478",
  "text-3": "#9ca3af",

  primary: "#4f46e5",
  "primary-weak": "rgba(79,70,229,.08)",
  "primary-text": "#4f46e5",

  ok: "#16a34a",
  "ok-bg": "#e7f6ec",
  warn: "#d97706",
  "warn-bg": "#fdf1e0",
  info: "#2563eb",
  "info-bg": "#e7eefe",
  muted: "#5b6478",
  "muted-bg": "#f6f7fb",
  danger: "#dc2626",
  "danger-bg": "#fdeaea",

  radius: "0.75rem",
  "radius-sm": "0.45rem",
  "radius-lg": "0.75rem",
  "radius-xl": "1.05rem",
}

/** Dark 模式 — 对齐 entry .dark */
export const darkTokens: ThemeTokens = {
  bg: "#0f1117",
  surface: "#1a1d27",
  "surface-2": "#1e2130",

  border: "rgba(255,255,255,.08)",
  "border-strong": "rgba(255,255,255,.15)",

  text: "#e5e7eb",
  "text-2": "#9ca3af",
  "text-3": "#6b7280",

  primary: "#6366f1",
  "primary-weak": "rgba(99,102,241,.12)",
  "primary-text": "#818cf8",

  ok: "#34d399",
  "ok-bg": "#0f2a20",
  warn: "#fbbf24",
  "warn-bg": "#2c220c",
  info: "#60a5fa",
  "info-bg": "#11233f",
  muted: "#9ca3af",
  "muted-bg": "#1e2130",
  danger: "#ef4444",
  "danger-bg": "#311414",

  radius: "0.75rem",
  "radius-sm": "0.45rem",
  "radius-lg": "0.75rem",
  "radius-xl": "1.05rem",
}

/**
 * 将 ThemeTokens 转为 { "--dp-bg": "#f6f7fb", ... } 形式的 CSS 变量对象，
 * 可直接用于 React 内联 style。
 */
export function tokensToCssVars(
  tokens: ThemeTokens
): Record<string, string> {
  const vars: Record<string, string> = {}
  for (const [key, value] of Object.entries(tokens)) {
    vars[`--dp-${key}`] = value
  }
  return vars
}
