export { bridge } from "./bridge"
export { BRIDGE_PROTO } from "./constants"
export { onHostMessage } from "./rpc"
export type {
  BridgeContext,
  ResultEnvelope,
  RenderHint,
  NextAction,
  InvokeOptions,
  BridgeMessage,
} from "./types"

// 卡片 schema 类型（纯类型，无 React 依赖）
export type {
  CardSchema,
  CardViewData,
  TableViewData,
  ListViewData,
  AppViewData,
  CardFact,
  CardAction,
  TableColumn,
  ListItem,
  FieldFormat,
} from "./cards/schema"
