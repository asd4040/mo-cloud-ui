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

const boxStyle: React.CSSProperties = {
  width: 16,
  height: 16,
  borderRadius: "var(--dp-radius-sm, 0.375rem)",
  border: "1px solid var(--dp-border-strong, #d6d9df)",
  background: "var(--dp-surface, #ffffff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s ease",
  flexShrink: 0,
}

const checkedBoxStyle: React.CSSProperties = {
  ...boxStyle,
  background: "var(--dp-primary, #6366f1)",
  borderColor: "var(--dp-primary, #6366f1)",
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  pointerEvents: "none",
}

const checkSvg = (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

export interface MoCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: React.ReactNode
}

export function MoCheckbox({ label, checked, disabled, style, className, ...props }: MoCheckboxProps) {
  return (
    <label style={{ ...wrapperStyle, ...(disabled ? disabledStyle : undefined), ...style }}>
      <input type="checkbox" checked={checked} disabled={disabled} style={{ display: "none" }} {...props} />
      <span style={checked ? checkedBoxStyle : boxStyle}>
        {checked && checkSvg}
      </span>
      {label && <span>{label}</span>}
    </label>
  )
}
