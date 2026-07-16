import * as React from "react"

/* ── 变体样式映射 ── */

const variantStyles: Record<string, React.CSSProperties> = {
  default: {
    border: "1px solid var(--dp-border-strong, #d6d9df)",
    background: "var(--dp-surface-2, #fbfbfc)",
    color: "var(--dp-text, #1a1d23)",
  },
  primary: {
    border: "1px solid transparent",
    background: "var(--dp-primary, #6366f1)",
    color: "#ffffff",
  },
  ghost: {
    border: "1px solid transparent",
    background: "transparent",
    color: "var(--dp-text-2, #5b6472)",
  },
  danger: {
    border: "1px solid var(--dp-danger, #dc2626)",
    background: "var(--dp-danger-bg, #fdeaea)",
    color: "var(--dp-danger, #dc2626)",
  },
  link: {
    border: "none",
    background: "transparent",
    color: "var(--dp-primary-text, #4f46e5)",
    textDecoration: "underline",
    textUnderlineOffset: "4px",
  },
}

const sizeStyles: Record<string, React.CSSProperties> = {
  sm: { height: 28, padding: "4px 10px", fontSize: 12 },
  default: { height: 32, padding: "6px 14px", fontSize: 12 },
  lg: { height: 36, padding: "8px 16px", fontSize: 14 },
  icon: { height: 32, width: 32, padding: 0 },
  "icon-sm": { height: 28, width: 28, padding: 0 },
}

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 6,
  borderRadius: "var(--dp-radius, 0.625rem)",
  fontWeight: 600,
  fontFamily: "inherit",
  whiteSpace: "nowrap",
  cursor: "pointer",
  transition: "all 0.15s ease",
  outline: "none",
  userSelect: "none",
  lineHeight: 1,
  boxSizing: "border-box",
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  pointerEvents: "none",
}

/* ── 组件 ── */

export type ButtonVariant = "default" | "primary" | "ghost" | "danger" | "link"
export type ButtonSize = "sm" | "default" | "lg" | "icon" | "icon-sm"

export interface MoButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function MoButton({
  variant = "default",
  size = "default",
  disabled,
  style,
  ...props
}: MoButtonProps) {
  const merged: React.CSSProperties = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...(disabled ? disabledStyle : undefined),
    ...style,
  }

  return <button disabled={disabled} style={merged} {...props} />
}
