import * as React from 'react';

type ButtonVariant = "default" | "primary" | "ghost" | "danger" | "link";
type ButtonSize = "sm" | "default" | "lg" | "icon" | "icon-sm";
interface MoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
}
declare function MoButton({ variant, size, disabled, style, ...props }: MoButtonProps): React.JSX.Element;

type MoInputProps = React.InputHTMLAttributes<HTMLInputElement>;
declare function MoInput({ disabled, style, onFocus, onBlur, ...props }: MoInputProps): React.JSX.Element;

type MoTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
declare function MoTextarea({ disabled, style, onFocus, onBlur, ...props }: MoTextareaProps): React.JSX.Element;

type MoSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;
declare function MoSelect({ disabled, style, onFocus, onBlur, ...props }: MoSelectProps): React.JSX.Element;

interface MoCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: React.ReactNode;
}
declare function MoCheckbox({ label, checked, disabled, style, className, ...props }: MoCheckboxProps): React.JSX.Element;

interface MoRadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: React.ReactNode;
}
declare function MoRadio({ label, checked, disabled, style, ...props }: MoRadioProps): React.JSX.Element;

interface MoSwitchProps {
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    disabled?: boolean;
    label?: React.ReactNode;
    style?: React.CSSProperties;
}
declare function MoSwitch({ checked, onChange, disabled, label, style }: MoSwitchProps): React.JSX.Element;

interface MoLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    disabled?: boolean;
}
declare function MoLabel({ disabled, style, ...props }: MoLabelProps): React.JSX.Element;

type BadgeVariant = "default" | "ok" | "warn" | "danger" | "info" | "secondary";
interface MoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: BadgeVariant;
}
declare function MoBadge({ variant, style, ...props }: MoBadgeProps): React.JSX.Element;

interface MoSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    width?: string | number;
    height?: string | number;
    circle?: boolean;
}
declare function MoSkeleton({ width, height, circle, style, ...props }: MoSkeletonProps): React.JSX.Element;

interface MoCardProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function MoCard({ style, ...props }: MoCardProps): React.JSX.Element;
interface MoCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function MoCardHeader({ style, ...props }: MoCardHeaderProps): React.JSX.Element;
interface MoCardTitleProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function MoCardTitle({ style, ...props }: MoCardTitleProps): React.JSX.Element;
interface MoCardDescriptionProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function MoCardDescription({ style, ...props }: MoCardDescriptionProps): React.JSX.Element;
interface MoCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function MoCardContent({ style, ...props }: MoCardContentProps): React.JSX.Element;
interface MoCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
}
declare function MoCardFooter({ style, ...props }: MoCardFooterProps): React.JSX.Element;

/**
 * 设计令牌 — 固定匹配 entry 设计系统，不支持自定义。
 * 色值从 web/entry/src/index.css 的 :root / .dark 中提取。
 */
interface ThemeTokens {
    bg: string;
    surface: string;
    "surface-2": string;
    border: string;
    "border-strong": string;
    text: string;
    "text-2": string;
    "text-3": string;
    primary: string;
    "primary-weak": string;
    "primary-text": string;
    ok: string;
    "ok-bg": string;
    warn: string;
    "warn-bg": string;
    info: string;
    "info-bg": string;
    muted: string;
    "muted-bg": string;
    danger: string;
    "danger-bg": string;
    radius: string;
    "radius-sm": string;
    "radius-lg": string;
    "radius-xl": string;
}
/** Light 模式 — 对齐 entry :root */
declare const lightTokens: ThemeTokens;
/** Dark 模式 — 对齐 entry .dark */
declare const darkTokens: ThemeTokens;
/**
 * 将 ThemeTokens 转为 { "--dp-bg": "#f6f7fb", ... } 形式的 CSS 变量对象，
 * 可直接用于 React 内联 style。
 */
declare function tokensToCssVars(tokens: ThemeTokens): Record<string, string>;

type ThemeMode = "light" | "dark";
interface ThemeContextValue {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    tokens: ThemeTokens;
}
interface ThemeProviderProps {
    /**
     * 初始主题模式，默认 "light"。
     * 设为 "auto" 时自动检测宿主 <html class="dark"> 并跟随切换。
     */
    defaultMode?: ThemeMode | "auto";
    children: React.ReactNode;
}
declare function ThemeProvider({ defaultMode, children, }: ThemeProviderProps): React.JSX.Element;
declare function useTheme(): ThemeContextValue;

export { type BadgeVariant, type ButtonSize, type ButtonVariant, MoBadge, type MoBadgeProps, MoButton, type MoButtonProps, MoCard, MoCardContent, type MoCardContentProps, MoCardDescription, type MoCardDescriptionProps, MoCardFooter, type MoCardFooterProps, MoCardHeader, type MoCardHeaderProps, type MoCardProps, MoCardTitle, type MoCardTitleProps, MoCheckbox, type MoCheckboxProps, MoInput, type MoInputProps, MoLabel, type MoLabelProps, MoRadio, type MoRadioProps, MoSelect, type MoSelectProps, MoSkeleton, type MoSkeletonProps, MoSwitch, type MoSwitchProps, MoTextarea, type MoTextareaProps, type ThemeContextValue, type ThemeMode, ThemeProvider, type ThemeProviderProps, type ThemeTokens, darkTokens, lightTokens, tokensToCssVars, useTheme };
