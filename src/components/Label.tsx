import * as React from "react"

const baseStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--dp-text, #1a1d23)",
  lineHeight: 1.5,
  userSelect: "none",
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  pointerEvents: "none",
}

export interface MoLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  disabled?: boolean
}

export function MoLabel({ disabled, style, ...props }: MoLabelProps) {
  return (
    <label
      style={{ ...baseStyle, ...(disabled ? disabledStyle : undefined), ...style }}
      {...props}
    />
  )
}
