import * as React from "react"

const wrapperStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: 14,
  color: "var(--dp-text, #1a1d23)",
  userSelect: "none",
}

const circleStyle: React.CSSProperties = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  border: "1px solid var(--dp-border-strong, #d6d9df)",
  background: "var(--dp-surface, #ffffff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s ease",
  flexShrink: 0,
}

const checkedCircleStyle: React.CSSProperties = {
  ...circleStyle,
  borderColor: "var(--dp-primary, #6366f1)",
  borderWidth: 2,
}

const dotStyle: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "var(--dp-primary, #6366f1)",
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  pointerEvents: "none",
}

export interface MoRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode
}

export function MoRadio({ label, checked, disabled, style, ...props }: MoRadioProps) {
  return (
    <label style={{ ...wrapperStyle, ...(disabled ? disabledStyle : undefined), ...style }}>
      <input type="radio" checked={checked} disabled={disabled} style={{ display: "none" }} {...props} />
      <span style={checked ? checkedCircleStyle : circleStyle}>
        {checked && <span style={dotStyle} />}
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}
