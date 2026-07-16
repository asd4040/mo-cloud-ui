/**
 * @mo-cloud/ui — Official UI Kit for mo-cloud embedded apps.
 *
 * 组件使用纯 CSS-in-JS（内联样式 + CSS 变量 --dp-*），不依赖 Tailwind。
 * 支持 light/dark 模式，通过 CSS 变量自动切换。
 *
 * @example
 * ```tsx
 * import { MoButton, MoCard, MoCardContent, MoInput } from '@mo-cloud/ui'
 * ```
 */

// Button
export { MoButton, type MoButtonProps, type ButtonVariant, type ButtonSize } from "./components/Button"

// Input
export { MoInput, type MoInputProps } from "./components/Input"

// Textarea
export { MoTextarea, type MoTextareaProps } from "./components/Textarea"

// Select
export { MoSelect, type MoSelectProps } from "./components/Select"

// Checkbox
export { MoCheckbox, type MoCheckboxProps } from "./components/Checkbox"

// Radio
export { MoRadio, type MoRadioProps } from "./components/Radio"

// Switch
export { MoSwitch, type MoSwitchProps } from "./components/Switch"

// Label
export { MoLabel, type MoLabelProps } from "./components/Label"

// Badge
export { MoBadge, type MoBadgeProps, type BadgeVariant } from "./components/Badge"

// Skeleton
export { MoSkeleton, type MoSkeletonProps } from "./components/Skeleton"

// Card
export {
  MoCard,
  MoCardHeader,
  MoCardTitle,
  MoCardDescription,
  MoCardContent,
  MoCardFooter,
  type MoCardProps,
  type MoCardHeaderProps,
  type MoCardTitleProps,
  type MoCardDescriptionProps,
  type MoCardContentProps,
  type MoCardFooterProps,
} from "./components/Card"

// Theme
export {
  ThemeProvider,
  useTheme,
  type ThemeMode,
  type ThemeContextValue,
  type ThemeProviderProps,
} from "./theme/ThemeProvider"

export {
  lightTokens,
  darkTokens,
  tokensToCssVars,
  type ThemeTokens,
} from "./theme/tokens"
