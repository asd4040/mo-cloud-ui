/** 宿主注入的上下文信息 */
interface BridgeContext {
    app_id: string;
    user: {
        openid: string;
        granted_scopes: string[];
    };
    session_id: string;
    capabilities: string[];
    query?: string;
    launchData?: unknown;
}
/** 能力调用统一返回信封 */
interface ResultEnvelope {
    request_id: string;
    status: "ok" | "error" | "need_consent" | "need_confirm";
    output: Record<string, unknown>;
    error?: {
        code: string;
        message: string;
    };
}
/** invokeCapability 选项 */
interface InvokeOptions {
    timeout_ms?: number;
}
/** postMessage 线上消息格式（内部使用） */
interface BridgeMessage {
    mo: string;
    kind: string;
    [key: string]: unknown;
}

/**
 * MoBridge —— 嵌入式 App 的 Bridge 客户端。
 *
 * 使用方式：
 *   import { bridge } from '@mocloud/frontend-sdk'
 *   const ctx = await bridge.getContext()
 *   const res = await bridge.invokeCapability('get_weather', { lat: 22.54, lon: 114.06 })
 */

declare class MoBridge {
    private _context;
    private _contextPromise;
    private _mock;
    /** 是否处于 mock 模式（无宿主） */
    get isMock(): boolean;
    /**
     * 获取宿主注入的上下文。首次调用触发握手，后续调用返回缓存。
     */
    getContext(): Promise<BridgeContext>;
    /**
     * 调用宿主能力，返回统一信封。
     */
    invokeCapability(capabilityKey: string, args?: Record<string, unknown>, opts?: InvokeOptions): Promise<ResultEnvelope>;
    /** iframe UI 控制 */
    ui: {
        open: () => void;
        resize: (width: number, height: number) => void;
        close: () => void;
    };
    /** 埋点上报 */
    track(event: string, payload?: Record<string, unknown>): void;
    /**
     * 监听宿主推送（如 consent-updated），返回取消函数。
     */
    onMessage(kind: string, handler: (msg: BridgeMessage) => void): () => void;
    private _handshake;
    private _parseEnvelope;
}
/** 全局单例 */
declare const bridge: MoBridge;

/** Bridge 协议版本标识，所有 postMessage 消息均携带 mo 字段。 */
declare const BRIDGE_PROTO = "bridge/v1";

/**
 * postMessage RPC 引擎
 *
 * 职责：
 *   向宿主 (window.parent) 发送请求并通过 request_id 关联异步响应。
 *   自动管理超时与全局消息监听器（单例）。
 */

/**
 * 监听宿主推送（非 RPC 响应的主动消息），返回取消函数。
 */
declare function onHostMessage(kind: string, handler: (msg: BridgeMessage) => void): () => void;

export { BRIDGE_PROTO, type BridgeContext, type BridgeMessage, type InvokeOptions, type ResultEnvelope, bridge, onHostMessage };
