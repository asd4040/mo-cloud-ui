import * as React from "react"

/* ── Card ── */

const cardStyle: React.CSSProperties = {
  overflow: "hidden",
  borderRadius: "var(--dp-radius-lg, 0.75rem)",
  border: "1px solid var(--dp-border, #e6e8ec)",
  background: "var(--dp-surface, #ffffff)",
  color: "var(--dp-text, #1a1d23)",
  fontSize: 14,
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  boxSizing: "border-box",
}

export interface MoCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MoCard({ style, ...props }: MoCardProps) {
  return <div style={{ ...cardStyle, ...style }} {...props} />
}

/* ── CardHeader ── */

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  borderBottom: "1px solid var(--dp-border, #e6e8ec)",
  padding: "12px 16px",
  boxSizing: "border-box",
}

export interface MoCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MoCardHeader({ style, ...props }: MoCardHeaderProps) {
  return <div style={{ ...headerStyle, ...style }} {...props} />
}

/* ── CardTitle ── */

const titleStyle: React.CSSProperties = {
  fontSize: 13.5,
  fontWeight: 600,
  color: "var(--dp-text, #1a1d23)",
  lineHeight: 1.4,
}

export interface MoCardTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MoCardTitle({ style, ...props }: MoCardTitleProps) {
  return <div style={{ ...titleStyle, ...style }} {...props} />
}

/* ── CardDescription ── */

const descStyle: React.CSSProperties = {
  fontSize: 12,
  color: "var(--dp-text-2, #5b6472)",
  lineHeight: 1.5,
}

export interface MoCardDescriptionProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function MoCardDescription({ style, ...props }: MoCardDescriptionProps) {
  return <div style={{ ...descStyle, ...style }} {...props} />
}

/* ── CardContent ── */

const contentStyle: React.CSSProperties = {
  padding: "12px 16px",
  boxSizing: "border-box",
}

export interface MoCardContentProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export function MoCardContent({ style, ...props }: MoCardContentProps) {
  return <div style={{ ...contentStyle, ...style }} {...props} />
}

/* ── CardFooter ── */

const footerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid var(--dp-border, #e6e8ec)",
  background: "var(--dp-surface-2, #fbfbfc)",
  padding: "12px 16px",
  boxSizing: "border-box",
}

export interface MoCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MoCardFooter({ style, ...props }: MoCardFooterProps) {
  return <div style={{ ...footerStyle, ...style }} {...props} />
}
