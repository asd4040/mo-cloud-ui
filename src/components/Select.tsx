import * as React from "react"

const baseStyle: React.CSSProperties = {
  height: 32,
  width: "100%",
  minWidth: 0,
  borderRadius: "var(--dp-radius, 0.625rem)",
  border: "1px solid var(--dp-border, #e6e8ec)",
  background: "var(--dp-surface, #ffffff)",
  padding: "4px 28px 4px 10px",
  fontSize: 14,
  color: "var(--dp-text, #1a1d23)",
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  boxSizing: "border-box",
  fontFamily: "inherit",
  lineHeight: 1.5,
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239aa2b1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  pointerEvents: "none",
}

export type MoSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

export function MoSelect({ disabled, style, onFocus, onBlur, ...props }: MoSelectProps) {
  const [focused, setFocused] = React.useState(false)

  const focusStyle: React.CSSProperties = focused
    ? {
        borderColor: "var(--dp-primary, #6366f1)",
        boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)",
      }
    : {}

  const merged: React.CSSProperties = {
    ...baseStyle,
    ...focusStyle,
    ...(disabled ? disabledStyle : undefined),
    ...style,
  }

  return (
    <select
      disabled={disabled}
      style={merged}
      onFocus={(e) => { setFocused(true); onFocus?.(e) }}
      onBlur={(e) => { setFocused(false); onBlur?.(e) }}
      {...props}
    />
  )
}
