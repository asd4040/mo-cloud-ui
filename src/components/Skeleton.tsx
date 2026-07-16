import * as React from "react"

const SKELETON_KEYFRAMES = "mo-ui-skeleton-pulse"

function injectKeyframes() {
  if (typeof document === "undefined") return
  if (document.getElementById(SKELETON_KEYFRAMES)) return
  const style = document.createElement("style")
  style.id = SKELETON_KEYFRAMES
  style.textContent = `
    @keyframes ${SKELETON_KEYFRAMES} {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `
  document.head.appendChild(style)
}

const baseStyle: React.CSSProperties = {
  display: "block",
  borderRadius: "var(--dp-radius-sm, 0.375rem)",
  background: "var(--dp-border, #e6e8ec)",
  animation: `${SKELETON_KEYFRAMES} 1.5s ease-in-out infinite`,
}

export interface MoSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
  circle?: boolean
}

export function MoSkeleton({ width, height = 16, circle, style, ...props }: MoSkeletonProps) {
  injectKeyframes()

  const size = circle ? (width ?? height) : undefined

  return (
    <div
      style={{
        ...baseStyle,
        width: circle ? size : (width ?? "100%"),
        height: circle ? size : height,
        borderRadius: circle ? "50%" : baseStyle.borderRadius,
        ...style,
      }}
      {...props}
    />
  )
}
