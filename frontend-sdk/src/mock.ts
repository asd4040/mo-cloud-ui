/**
 * 开发 Mock —— 无宿主环境时的 fallback。
 * 仅在本地开发使用，生产构建不可达。
 */

import type { BridgeContext, ResultEnvelope } from "./types"

const MOCK_CONTEXT: BridgeContext = {
  app_id: "mock-app",
  user: { openid: "mock-openid", granted_scopes: [] },
  session_id: "mock-session",
  capabilities: ["get_weather", "get_local_weather"],
  query: "",
}

export function getMockContext(): BridgeContext {
  return { ...MOCK_CONTEXT }
}

export function getMockResult(requestId: string, capabilityKey: string): ResultEnvelope {
  return {
    request_id: requestId,
    status: "ok",
    output: { _mock: true, capability: capabilityKey },
  }
}
