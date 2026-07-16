// src/components/Button.tsx
import { jsx } from "react/jsx-runtime";
var variantStyles = {
  default: {
    border: "1px solid var(--dp-border-strong, #d6d9df)",
    background: "var(--dp-surface-2, #fbfbfc)",
    color: "var(--dp-text, #1a1d23)"
  },
  primary: {
    border: "1px solid transparent",
    background: "var(--dp-primary, #6366f1)",
    color: "#ffffff"
  },
  ghost: {
    border: "1px solid transparent",
    background: "transparent",
    color: "var(--dp-text-2, #5b6472)"
  },
  danger: {
    border: "1px solid var(--dp-danger, #dc2626)",
    background: "var(--dp-danger-bg, #fdeaea)",
    color: "var(--dp-danger, #dc2626)"
  },
  link: {
    border: "none",
    background: "transparent",
    color: "var(--dp-primary-text, #4f46e5)",
    textDecoration: "underline",
    textUnderlineOffset: "4px"
  }
};
var sizeStyles = {
  sm: { height: 28, padding: "4px 10px", fontSize: 12 },
  default: { height: 32, padding: "6px 14px", fontSize: 12 },
  lg: { height: 36, padding: "8px 16px", fontSize: 14 },
  icon: { height: 32, width: 32, padding: 0 },
  "icon-sm": { height: 28, width: 28, padding: 0 }
};
var baseStyle = {
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
  boxSizing: "border-box"
};
var disabledStyle = {
  opacity: 0.5,
  pointerEvents: "none"
};
function MoButton({
  variant = "default",
  size = "default",
  disabled,
  style,
  ...props
}) {
  const merged = {
    ...baseStyle,
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...disabled ? disabledStyle : void 0,
    ...style
  };
  return /* @__PURE__ */ jsx("button", { disabled, style: merged, ...props });
}

// src/components/Input.tsx
import * as React from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
var baseStyle2 = {
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
  lineHeight: 1.5
};
var disabledStyle2 = {
  opacity: 0.5,
  pointerEvents: "none"
};
function MoInput({ disabled, style, onFocus, onBlur, ...props }) {
  const [focused, setFocused] = React.useState(false);
  const focusStyle = focused ? {
    borderColor: "var(--dp-primary, #6366f1)",
    boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)"
  } : {};
  const merged = {
    ...baseStyle2,
    ...focusStyle,
    ...disabled ? disabledStyle2 : void 0,
    ...style
  };
  return /* @__PURE__ */ jsx2(
    "input",
    {
      disabled,
      style: merged,
      onFocus: (e) => {
        setFocused(true);
        onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      ...props
    }
  );
}

// src/components/Textarea.tsx
import * as React2 from "react";
import { jsx as jsx3 } from "react/jsx-runtime";
var baseStyle3 = {
  width: "100%",
  minWidth: 0,
  minHeight: 80,
  borderRadius: "var(--dp-radius, 0.625rem)",
  border: "1px solid var(--dp-border, #e6e8ec)",
  background: "transparent",
  padding: "8px 10px",
  fontSize: 14,
  color: "var(--dp-text, #1a1d23)",
  outline: "none",
  transition: "border-color 0.15s ease, box-shadow 0.15s ease",
  boxSizing: "border-box",
  fontFamily: "inherit",
  lineHeight: 1.5,
  resize: "vertical"
};
var disabledStyle3 = {
  opacity: 0.5,
  pointerEvents: "none"
};
function MoTextarea({ disabled, style, onFocus, onBlur, ...props }) {
  const [focused, setFocused] = React2.useState(false);
  const focusStyle = focused ? {
    borderColor: "var(--dp-primary, #6366f1)",
    boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)"
  } : {};
  const merged = {
    ...baseStyle3,
    ...focusStyle,
    ...disabled ? disabledStyle3 : void 0,
    ...style
  };
  return /* @__PURE__ */ jsx3(
    "textarea",
    {
      disabled,
      style: merged,
      onFocus: (e) => {
        setFocused(true);
        onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      ...props
    }
  );
}

// src/components/Select.tsx
import * as React3 from "react";
import { jsx as jsx4 } from "react/jsx-runtime";
var baseStyle4 = {
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
  backgroundPosition: "right 8px center"
};
var disabledStyle4 = {
  opacity: 0.5,
  pointerEvents: "none"
};
function MoSelect({ disabled, style, onFocus, onBlur, ...props }) {
  const [focused, setFocused] = React3.useState(false);
  const focusStyle = focused ? {
    borderColor: "var(--dp-primary, #6366f1)",
    boxShadow: "0 0 0 2px rgba(99, 102, 241, 0.3)"
  } : {};
  const merged = {
    ...baseStyle4,
    ...focusStyle,
    ...disabled ? disabledStyle4 : void 0,
    ...style
  };
  return /* @__PURE__ */ jsx4(
    "select",
    {
      disabled,
      style: merged,
      onFocus: (e) => {
        setFocused(true);
        onFocus?.(e);
      },
      onBlur: (e) => {
        setFocused(false);
        onBlur?.(e);
      },
      ...props
    }
  );
}

// src/components/Checkbox.tsx
import { jsx as jsx5, jsxs } from "react/jsx-runtime";
var wrapperStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: 14,
  color: "var(--dp-text, #1a1d23)",
  userSelect: "none"
};
var boxStyle = {
  width: 16,
  height: 16,
  borderRadius: "var(--dp-radius-sm, 0.375rem)",
  border: "1px solid var(--dp-border-strong, #d6d9df)",
  background: "var(--dp-surface, #ffffff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s ease",
  flexShrink: 0
};
var checkedBoxStyle = {
  ...boxStyle,
  background: "var(--dp-primary, #6366f1)",
  borderColor: "var(--dp-primary, #6366f1)"
};
var disabledStyle5 = {
  opacity: 0.5,
  pointerEvents: "none"
};
var checkSvg = /* @__PURE__ */ jsx5("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "#fff", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsx5("polyline", { points: "20 6 9 17 4 12" }) });
function MoCheckbox({ label, checked, disabled, style, className, ...props }) {
  return /* @__PURE__ */ jsxs("label", { style: { ...wrapperStyle, ...disabled ? disabledStyle5 : void 0, ...style }, children: [
    /* @__PURE__ */ jsx5("input", { type: "checkbox", checked, disabled, style: { display: "none" }, ...props }),
    /* @__PURE__ */ jsx5("span", { style: checked ? checkedBoxStyle : boxStyle, children: checked && checkSvg }),
    label && /* @__PURE__ */ jsx5("span", { children: label })
  ] });
}

// src/components/Radio.tsx
import { jsx as jsx6, jsxs as jsxs2 } from "react/jsx-runtime";
var wrapperStyle2 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  cursor: "pointer",
  fontSize: 14,
  color: "var(--dp-text, #1a1d23)",
  userSelect: "none"
};
var circleStyle = {
  width: 16,
  height: 16,
  borderRadius: "50%",
  border: "1px solid var(--dp-border-strong, #d6d9df)",
  background: "var(--dp-surface, #ffffff)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s ease",
  flexShrink: 0
};
var checkedCircleStyle = {
  ...circleStyle,
  borderColor: "var(--dp-primary, #6366f1)",
  borderWidth: 2
};
var dotStyle = {
  width: 8,
  height: 8,
  borderRadius: "50%",
  background: "var(--dp-primary, #6366f1)"
};
var disabledStyle6 = {
  opacity: 0.5,
  pointerEvents: "none"
};
function MoRadio({ label, checked, disabled, style, ...props }) {
  return /* @__PURE__ */ jsxs2("label", { style: { ...wrapperStyle2, ...disabled ? disabledStyle6 : void 0, ...style }, children: [
    /* @__PURE__ */ jsx6("input", { type: "radio", checked, disabled, style: { display: "none" }, ...props }),
    /* @__PURE__ */ jsx6("span", { style: checked ? checkedCircleStyle : circleStyle, children: checked && /* @__PURE__ */ jsx6("span", { style: dotStyle }) }),
    label && /* @__PURE__ */ jsx6("span", { children: label })
  ] });
}

// src/components/Switch.tsx
import { jsx as jsx7, jsxs as jsxs3 } from "react/jsx-runtime";
var trackStyle = {
  position: "relative",
  width: 34,
  height: 19,
  borderRadius: 10,
  background: "var(--dp-border-strong, #d6d9df)",
  cursor: "pointer",
  transition: "background 0.2s ease",
  flexShrink: 0
};
var trackCheckedStyle = {
  ...trackStyle,
  background: "var(--dp-primary, #6366f1)"
};
var thumbStyle = {
  position: "absolute",
  top: 2,
  left: 2,
  width: 15,
  height: 15,
  borderRadius: "50%",
  background: "#ffffff",
  boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  transition: "transform 0.2s ease"
};
var thumbCheckedStyle = {
  ...thumbStyle,
  transform: "translateX(15px)"
};
var wrapperStyle3 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  fontSize: 14,
  color: "var(--dp-text, #1a1d23)",
  userSelect: "none"
};
var disabledStyle7 = {
  opacity: 0.5,
  pointerEvents: "none"
};
function MoSwitch({ checked = false, onChange, disabled, label, style }) {
  const handleClick = () => {
    if (!disabled) onChange?.(!checked);
  };
  const handleKeyDown = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };
  return /* @__PURE__ */ jsxs3("div", { style: { ...wrapperStyle3, ...disabled ? disabledStyle7 : void 0, ...style }, children: [
    /* @__PURE__ */ jsx7(
      "div",
      {
        role: "switch",
        "aria-checked": checked,
        tabIndex: disabled ? -1 : 0,
        onClick: handleClick,
        onKeyDown: handleKeyDown,
        style: checked ? trackCheckedStyle : trackStyle,
        children: /* @__PURE__ */ jsx7("span", { style: checked ? thumbCheckedStyle : thumbStyle })
      }
    ),
    label && /* @__PURE__ */ jsx7("span", { children: label })
  ] });
}

// src/components/Label.tsx
import { jsx as jsx8 } from "react/jsx-runtime";
var baseStyle5 = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--dp-text, #1a1d23)",
  lineHeight: 1.5,
  userSelect: "none"
};
var disabledStyle8 = {
  opacity: 0.5,
  pointerEvents: "none"
};
function MoLabel({ disabled, style, ...props }) {
  return /* @__PURE__ */ jsx8(
    "label",
    {
      style: { ...baseStyle5, ...disabled ? disabledStyle8 : void 0, ...style },
      ...props
    }
  );
}

// src/components/Badge.tsx
import { jsx as jsx9 } from "react/jsx-runtime";
var variantStyles2 = {
  default: {
    background: "var(--dp-primary-weak, #eef0ff)",
    color: "var(--dp-primary-text, #4f46e5)"
  },
  ok: {
    background: "var(--dp-ok-bg, #e7f6ec)",
    color: "var(--dp-ok, #16a34a)"
  },
  warn: {
    background: "var(--dp-warn-bg, #fdf1e0)",
    color: "var(--dp-warn, #d97706)"
  },
  danger: {
    background: "var(--dp-danger-bg, #fdeaea)",
    color: "var(--dp-danger, #dc2626)"
  },
  info: {
    background: "var(--dp-info-bg, #e7eefe)",
    color: "var(--dp-info, #2563eb)"
  },
  secondary: {
    background: "var(--dp-muted-bg, #eef0f3)",
    color: "var(--dp-muted, #6b7280)"
  }
};
var baseStyle6 = {
  display: "inline-flex",
  alignItems: "center",
  gap: 4,
  padding: "2px 8px",
  borderRadius: 9999,
  fontSize: 12,
  fontWeight: 500,
  lineHeight: 1.5,
  whiteSpace: "nowrap"
};
function MoBadge({ variant = "default", style, ...props }) {
  return /* @__PURE__ */ jsx9(
    "span",
    {
      style: { ...baseStyle6, ...variantStyles2[variant], ...style },
      ...props
    }
  );
}

// src/components/Skeleton.tsx
import { jsx as jsx10 } from "react/jsx-runtime";
var SKELETON_KEYFRAMES = "mo-ui-skeleton-pulse";
function injectKeyframes() {
  if (typeof document === "undefined") return;
  if (document.getElementById(SKELETON_KEYFRAMES)) return;
  const style = document.createElement("style");
  style.id = SKELETON_KEYFRAMES;
  style.textContent = `
    @keyframes ${SKELETON_KEYFRAMES} {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }
  `;
  document.head.appendChild(style);
}
var baseStyle7 = {
  display: "block",
  borderRadius: "var(--dp-radius-sm, 0.375rem)",
  background: "var(--dp-border, #e6e8ec)",
  animation: `${SKELETON_KEYFRAMES} 1.5s ease-in-out infinite`
};
function MoSkeleton({ width, height = 16, circle, style, ...props }) {
  injectKeyframes();
  const size = circle ? width ?? height : void 0;
  return /* @__PURE__ */ jsx10(
    "div",
    {
      style: {
        ...baseStyle7,
        width: circle ? size : width ?? "100%",
        height: circle ? size : height,
        borderRadius: circle ? "50%" : baseStyle7.borderRadius,
        ...style
      },
      ...props
    }
  );
}

// src/components/Card.tsx
import { jsx as jsx11 } from "react/jsx-runtime";
var cardStyle = {
  overflow: "hidden",
  borderRadius: "var(--dp-radius-lg, 0.75rem)",
  border: "1px solid var(--dp-border, #e6e8ec)",
  background: "var(--dp-surface, #ffffff)",
  color: "var(--dp-text, #1a1d23)",
  fontSize: 14,
  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
  boxSizing: "border-box"
};
function MoCard({ style, ...props }) {
  return /* @__PURE__ */ jsx11("div", { style: { ...cardStyle, ...style }, ...props });
}
var headerStyle = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  borderBottom: "1px solid var(--dp-border, #e6e8ec)",
  padding: "12px 16px",
  boxSizing: "border-box"
};
function MoCardHeader({ style, ...props }) {
  return /* @__PURE__ */ jsx11("div", { style: { ...headerStyle, ...style }, ...props });
}
var titleStyle = {
  fontSize: 13.5,
  fontWeight: 600,
  color: "var(--dp-text, #1a1d23)",
  lineHeight: 1.4
};
function MoCardTitle({ style, ...props }) {
  return /* @__PURE__ */ jsx11("div", { style: { ...titleStyle, ...style }, ...props });
}
var descStyle = {
  fontSize: 12,
  color: "var(--dp-text-2, #5b6472)",
  lineHeight: 1.5
};
function MoCardDescription({ style, ...props }) {
  return /* @__PURE__ */ jsx11("div", { style: { ...descStyle, ...style }, ...props });
}
var contentStyle = {
  padding: "12px 16px",
  boxSizing: "border-box"
};
function MoCardContent({ style, ...props }) {
  return /* @__PURE__ */ jsx11("div", { style: { ...contentStyle, ...style }, ...props });
}
var footerStyle = {
  display: "flex",
  alignItems: "center",
  borderTop: "1px solid var(--dp-border, #e6e8ec)",
  background: "var(--dp-surface-2, #fbfbfc)",
  padding: "12px 16px",
  boxSizing: "border-box"
};
function MoCardFooter({ style, ...props }) {
  return /* @__PURE__ */ jsx11("div", { style: { ...footerStyle, ...style }, ...props });
}

// src/theme/ThemeProvider.tsx
import * as React4 from "react";

// src/theme/tokens.ts
var lightTokens = {
  bg: "#f6f7fb",
  surface: "#ffffff",
  "surface-2": "#f6f7fb",
  border: "#e7e9f1",
  "border-strong": "#d6d9e4",
  text: "#0f1320",
  "text-2": "#5b6478",
  "text-3": "#9ca3af",
  primary: "#4f46e5",
  "primary-weak": "rgba(79,70,229,.08)",
  "primary-text": "#4f46e5",
  ok: "#16a34a",
  "ok-bg": "#e7f6ec",
  warn: "#d97706",
  "warn-bg": "#fdf1e0",
  info: "#2563eb",
  "info-bg": "#e7eefe",
  muted: "#5b6478",
  "muted-bg": "#f6f7fb",
  danger: "#dc2626",
  "danger-bg": "#fdeaea",
  radius: "0.75rem",
  "radius-sm": "0.45rem",
  "radius-lg": "0.75rem",
  "radius-xl": "1.05rem"
};
var darkTokens = {
  bg: "#0f1117",
  surface: "#1a1d27",
  "surface-2": "#1e2130",
  border: "rgba(255,255,255,.08)",
  "border-strong": "rgba(255,255,255,.15)",
  text: "#e5e7eb",
  "text-2": "#9ca3af",
  "text-3": "#6b7280",
  primary: "#6366f1",
  "primary-weak": "rgba(99,102,241,.12)",
  "primary-text": "#818cf8",
  ok: "#34d399",
  "ok-bg": "#0f2a20",
  warn: "#fbbf24",
  "warn-bg": "#2c220c",
  info: "#60a5fa",
  "info-bg": "#11233f",
  muted: "#9ca3af",
  "muted-bg": "#1e2130",
  danger: "#ef4444",
  "danger-bg": "#311414",
  radius: "0.75rem",
  "radius-sm": "0.45rem",
  "radius-lg": "0.75rem",
  "radius-xl": "1.05rem"
};
function tokensToCssVars(tokens) {
  const vars = {};
  for (const [key, value] of Object.entries(tokens)) {
    vars[`--dp-${key}`] = value;
  }
  return vars;
}

// src/theme/ThemeProvider.tsx
import { jsx as jsx12 } from "react/jsx-runtime";
var ThemeContext = React4.createContext(null);
function ThemeProvider({
  defaultMode = "light",
  children
}) {
  const isAuto = defaultMode === "auto";
  const [mode, setMode] = React4.useState(() => {
    if (!isAuto) return defaultMode;
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark") ? "dark" : "light";
    }
    return "light";
  });
  React4.useEffect(() => {
    if (!isAuto || typeof document === "undefined") return;
    const detect = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setMode(isDark ? "dark" : "light");
    };
    detect();
    const observer = new MutationObserver(detect);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    return () => observer.disconnect();
  }, [isAuto]);
  const tokens = mode === "dark" ? darkTokens : lightTokens;
  const cssVars = React4.useMemo(() => tokensToCssVars(tokens), [tokens]);
  const ctx = React4.useMemo(
    () => ({ mode, setMode, tokens }),
    [mode, tokens]
  );
  return /* @__PURE__ */ jsx12(ThemeContext.Provider, { value: ctx, children: /* @__PURE__ */ jsx12("div", { style: cssVars, children }) });
}
function useTheme() {
  const ctx = React4.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a <ThemeProvider>");
  }
  return ctx;
}
export {
  MoBadge,
  MoButton,
  MoCard,
  MoCardContent,
  MoCardDescription,
  MoCardFooter,
  MoCardHeader,
  MoCardTitle,
  MoCheckbox,
  MoInput,
  MoLabel,
  MoRadio,
  MoSelect,
  MoSkeleton,
  MoSwitch,
  MoTextarea,
  ThemeProvider,
  darkTokens,
  lightTokens,
  tokensToCssVars,
  useTheme
};
//# sourceMappingURL=index.js.map