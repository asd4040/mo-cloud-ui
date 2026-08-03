/**
 * MoBridge —— 嵌入式 App 的 Bridge 客户端。
 *
 * 使用方式：
 *   import { bridge } from '@mocloud/frontend-sdk'
 *   const ctx = await bridge.getContext()
 *   const res = await bridge.invokeCapability('get_weather', { lat: 22.54, lon: 114.06 })
 */

import { BRIDGE_PROTO, DEFAULT_INVOKE_TIMEOUT_MS, HANDSHAKE_TIMEOUT_MS } from "./constants"
import { sendRequest, sendFire, onHostMessage } from "./rpc"
import { getMockContext, getMockResult } from "./mock"
import type { BridgeContext, ResultEnvelope, InvokeOptions, BridgeMessage } from "./types"

class MoBridge {
  private _context: BridgeContext | null = null
  private _contextPromise: Promise<BridgeContext> | null = null
  private _mock = false

  /** 是否处于 mock 模式（无宿主） */
  get isMock(): boolean {
    return this._mock
  }

  /**
   * 获取宿主注入的上下文。首次调用触发握手，后续调用返回缓存。
   */
  getContext(): Promise<BridgeContext> {
    if (this._contextPromise) return this._contextPromise
    this._contextPromise = this._handshake()
    return this._contextPromise
  }

  /**
   * 调用宿主能力，返回统一信封。
   */
  async invokeCapability(
    capabilityKey: string,
    args: Record<string, unknown> = {},
    opts?: InvokeOptions,
  ): Promise<ResultEnvelope> {
    const ctx = await this.getContext()

    if (this._mock) {
      const id = `mock_${Date.now()}`
      console.debug("[mocloud-frontend-sdk mock] invokeCapability", capabilityKey, args)
      return getMockResult(id, capabilityKey)
    }

    const timeout = opts?.timeout_ms ?? DEFAULT_INVOKE_TIMEOUT_MS
    const resp = await sendRequest("invoke", { capability_key: capabilityKey, args }, timeout)
    return this._parseEnvelope(resp)
  }

  /** iframe UI 控制 */
  ui = {
    open: () => sendFire("ui-open"),
    resize: (width: number, height: number) => sendFire("ui-resize", { width, height }),
    close: () => sendFire("ui-close"),
  }

  /** 埋点上报 */
  track(event: string, payload?: Record<string, unknown>): void {
    if (this._mock) {
      console.debug("[mocloud-frontend-sdk mock] track", event, payload)
      return
    }
    sendFire("track", { event, payload })
  }

  /**
   * 监听宿主推送（如 consent-updated），返回取消函数。
   */
  onMessage(kind: string, handler: (msg: BridgeMessage) => void): () => void {
    return onHostMessage(kind, handler)
  }

  // ── 内部方法 ──

  private async _handshake(): Promise<BridgeContext> {
    // 不在 iframe 中 → 直接 mock
    if (typeof window === "undefined" || window.parent === window) {
      this._mock = true
      console.debug("[mocloud-frontend-sdk] No host detected, entering mock mode")
      return getMockContext()
    }

    try {
      // 发 ready，等宿主 auth 响应
      const resp = await sendRequest("ready", {}, HANDSHAKE_TIMEOUT_MS)
      this._context = {
        app_id: (resp.app_id as string) ?? "",
        user: {
          openid: (resp.openid as string) ?? "",
          granted_scopes: (resp.granted_scopes as string[]) ?? [],
        },
        session_id: (resp.session_id as string) ?? "",
        capabilities: (resp.capabilities as string[]) ?? [],
        query: resp.query as string | undefined,
        launchData: resp.launchData,
      }
      return this._context
    } catch {
      // 握手超时 → mock
      this._mock = true
      console.debug("[mocloud-frontend-sdk] Handshake timeout, entering mock mode")
      return getMockContext()
    }
  }

  private _parseEnvelope(msg: BridgeMessage): ResultEnvelope {
    return {
      request_id: (msg.request_id as string) ?? "",
      status: (msg.status as ResultEnvelope["status"]) ?? "error",
      output: (msg.output as Record<string, unknown>) ?? {},
      render: msg.render as ResultEnvelope["render"],
      next_actions: msg.next_actions as ResultEnvelope["next_actions"],
      error: msg.error as ResultEnvelope["error"],
    }
  }
}

/** 全局单例 */
export const bridge = new MoBridge()
