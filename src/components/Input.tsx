import * as React from "react"

const baseStyle: React.CSSProperties = {
  height: 32,
  width: "100%",
  minWidth: 0,
  borderRadius: "var(--dp-radius, 0.625rem)",
  border: "1px solid var(--dp-border, #e6e8ec)",
  background: "transparent",
  padding: "4px 10px",
  fontSize: 14,
  color: "var(--dp-text, #1a1d23)",
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  boxSizing: "border-box",
  fontFamily: "inherit",
  lineHeight: 1.5,
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  pointerEvents: "none",
}

export type MoInputProps = React.InputHTMLAttributes<HTMLInputElement>

export function MoInput({ disabled, style, onFocus, onBlur, ...props }: MoInputProps) {
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
    <input
      disabled={disabled}
      style={merged}
      onFocus={(e) => {
        setFocused(true)
        onFocus?.(e)
      }}
      onBlur={(e) => {
        setFocused(false)
        onBlur?.(e)
      }}
      {...props}
    />
  )
}
