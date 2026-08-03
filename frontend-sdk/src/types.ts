/** 宿主注入的上下文信息 */
export interface BridgeContext {
  app_id: string
  user: {
    openid: string
    granted_scopes: string[]
  }
  session_id: string
  capabilities: string[]
  query?: string
  launchData?: unknown
}

/** 能力调用统一返回信封 */
export interface ResultEnvelope {
  request_id: string
  status: "ok" | "error" | "need_consent" | "need_confirm"
  output: Record<string, unknown>
  error?: { code: string; message: string }
}

/** invokeCapability 选项 */
export interface InvokeOptions {
  timeout_ms?: number
}

/** postMessage 线上消息格式（内部使用） */
export interface BridgeMessage {
  mo: string
  kind: string
  [key: string]: unknown
}
