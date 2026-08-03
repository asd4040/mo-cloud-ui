/** Bridge 协议版本标识，所有 postMessage 消息均携带 mo 字段。 */
export const BRIDGE_PROTO = "bridge/v1"

/** invokeCapability 默认超时（ms） */
export const DEFAULT_INVOKE_TIMEOUT_MS = 30_000

/** getContext 握手超时（ms），超时后进入 mock 模式 */
export const HANDSHAKE_TIMEOUT_MS = 3_000
