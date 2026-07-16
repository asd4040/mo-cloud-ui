import * as React from "react"

export type BadgeVariant = "default" | "ok" | "warn" | "danger" | "info" | "secondary"

const variantStyles: Record<BadgeVariant, React.CSSProperties> = {
  default: {
    background: "var(--dp-primary-weak, #eef0ff)",
    color: "var(--dp-primary-text, #4f46e5)",
  },
  ok: {
    background: "var(--dp-ok-bg, #e7f6ec)",
    color: "var(--dp-ok, #16a34a)",
  },
  warn: {
    background: "var(--dp-warn-bg, #fdf1e0)",
    color: "var(--dp-warn, #d97706)",
  },
  danger: {
    background: "var(--dp-danger-bg, #fdeaea)",
    color: "var(--dp-danger, #dc2626)",
  },
  info: {
    background: "var(--dp-info-bg, #e7eefe)",
    color: "var(--dp-info, #2563eb)",
  },
  secondary: {
    background: "var(--dp-muted-bg, #eef0f3)",
    color: "var(--dp-muted, #6b7280)",
  },
}

const baseStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  borderRadius: 9999,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 1.5,
  whiteSpace: "nowrap",
}

export interface MoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

export function MoBadge({ variant = "default", style, ...props }: MoBadgeProps) {
  return (
    <span
      style={{ ...baseStyle, ...variantStyles[variant], ...style }}
      {...props}
    />
  )
}
