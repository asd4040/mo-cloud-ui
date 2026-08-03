/**
 * postMessage RPC 引擎
 *
 * 职责：
 *   向宿主 (window.parent) 发送请求并通过 request_id 关联异步响应。
 *   自动管理超时与全局消息监听器（单例）。
 */

import { BRIDGE_PROTO } from "./constants"
import type { BridgeMessage } from "./types"

interface PendingRequest {
  resolve: (msg: BridgeMessage) => void
  reject: (err: Error) => void
  timer: ReturnType<typeof setTimeout>
}

let nextId = 0
const pending = new Map<string, PendingRequest>()
let listening = false
let hostOrigin = "*" // 握手前未知，握手成功后钉死为宿主实际 origin

function generateRequestId(): string {
  return `br_${Date.now()}_${++nextId}`
}

function ensureListener() {
  if (listening) return
  listening = true
  window.addEventListener("message", (ev: MessageEvent) => {
    // 仅接受来自父窗口的消息，防止同页面其他 iframe 伪造
    if (ev.source !== window.parent) return
    const msg = ev.data as BridgeMessage | null
    if (!msg || msg.mo !== BRIDGE_PROTO) return
    // 首次收到宿主响应时钉死 origin，后续 postMessage 不再用 *
    if (hostOrigin === "*" && ev.origin && ev.origin !== "null") {
      hostOrigin = ev.origin
    }
    const id = msg.request_id as string | undefined
    if (!id) return
    const p = pending.get(id)
    if (!p) return
    pending.delete(id)
    clearTimeout(p.timer)
    p.resolve(msg)
  })
}

/**
 * 向宿主发送 RPC 请求，等待匹配 request_id 的响应。
 * @param kind 消息类型
 * @param payload 附加字段
 * @param timeoutMs 超时（ms）
 */
export function sendRequest(kind: string, payload: Record<string, unknown>, timeoutMs: number): Promise<BridgeMessage> {
  ensureListener()
  const request_id = generateRequestId()
  return new Promise<BridgeMessage>((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(request_id)
      reject(new Error(`Bridge RPC timeout: ${kind} (${timeoutMs}ms)`))
    }, timeoutMs)
    pending.set(request_id, { resolve, reject, timer })
    window.parent.postMessage(
      { mo: BRIDGE_PROTO, kind, request_id, ...payload },
      hostOrigin, // 握手前为 *，握手成功后钉死为宿主实际 origin
    )
  })
}

/**
 * 向宿主发送单向消息（不等响应）。
 */
export function sendFire(kind: string, payload: Record<string, unknown> = {}): void {
  window.parent.postMessage({ mo: BRIDGE_PROTO, kind, ...payload }, hostOrigin)
}

/**
 * 监听宿主推送（非 RPC 响应的主动消息），返回取消函数。
 */
export function onHostMessage(kind: string, handler: (msg: BridgeMessage) => void): () => void {
  const listener = (ev: MessageEvent) => {
    const msg = ev.data as BridgeMessage | null
    if (!msg || msg.mo !== BRIDGE_PROTO || msg.kind !== kind) return
    handler(msg)
  }
  window.addEventListener("message", listener)
  return () => window.removeEventListener("message", listener)
}
