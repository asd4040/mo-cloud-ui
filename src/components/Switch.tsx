import * as React from "react"

const trackStyle: React.CSSProperties = {
  position: "relative",
  width: 34,
  height: 19,
  borderRadius: 10,
  background: "var(--dp-border-strong, #d6d9df)",
  cursor: "pointer",
  transition: "background 0.2s ease",
  flexShrink: 0,
}

const trackCheckedStyle: React.CSSProperties = {
  ...trackStyle,
  background: "var(--dp-primary, #6366f1)",
}

const thumbStyle: React.CSSProperties = {
  position: "absolute",
  top: 2,
  left: 2,
  width: 15,
  height: 15,
  borderRadius: "50%",
  background: "#ffffff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  transition: "transform 0.2s ease",
}

const thumbCheckedStyle: React.CSSProperties = {
  ...thumbStyle,
  transform: "translateX(15px)",
}

const wrapperStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  color: "var(--dp-text, #1a1d23)",
  userSelect: "none",
}

const disabledStyle: React.CSSProperties = {
  opacity: 0.5,
  pointerEvents: "none",
}

export interface MoSwitchProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  disabled?: boolean
  label?: React.ReactNode
  style?: React.CSSProperties
}

export function MoSwitch({ checked = false, onChange, disabled, label, style }: MoSwitchProps) {
  const handleClick = () => {
    if (!disabled) onChange?.(!checked)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault()
      handleClick()
    }
  }

  return (
    <div style={{ ...wrapperStyle, ...(disabled ? disabledStyle : undefined), ...style }}>
      <div
        role="switch"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        style={checked ? trackCheckedStyle : trackStyle}
      >
        <span style={checked ? thumbCheckedStyle : thumbStyle} />
      </div>
      {label && <span>{label}</span>}
    </div>
  )
}
