// src/constants.ts
var BRIDGE_PROTO = "bridge/v1";
var DEFAULT_INVOKE_TIMEOUT_MS = 3e4;
var HANDSHAKE_TIMEOUT_MS = 3e3;

// src/rpc.ts
var nextId = 0;
var pending = /* @__PURE__ */ new Map();
var listening = false;
var hostOrigin = "*";
function generateRequestId() {
  return `br_${Date.now()}_${++nextId}`;
}
function ensureListener() {
  if (listening) return;
  listening = true;
  window.addEventListener("message", (ev) => {
    if (ev.source !== window.parent) return;
    const msg = ev.data;
    if (!msg || msg.mo !== BRIDGE_PROTO) return;
    if (hostOrigin === "*" && ev.origin && ev.origin !== "null") {
      hostOrigin = ev.origin;
    }
    const id = msg.request_id;
    if (!id) return;
    const p = pending.get(id);
    if (!p) return;
    pending.delete(id);
    clearTimeout(p.timer);
    p.resolve(msg);
  });
}
function sendRequest(kind, payload, timeoutMs) {
  ensureListener();
  const request_id = generateRequestId();
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(request_id);
      reject(new Error(`Bridge RPC timeout: ${kind} (${timeoutMs}ms)`));
    }, timeoutMs);
    pending.set(request_id, { resolve, reject, timer });
    window.parent.postMessage(
      { mo: BRIDGE_PROTO, kind, request_id, ...payload },
      hostOrigin
      // 握手前为 *，握手成功后钉死为宿主实际 origin
    );
  });
}
function sendFire(kind, payload = {}) {
  window.parent.postMessage({ mo: BRIDGE_PROTO, kind, ...payload }, hostOrigin);
}
function onHostMessage(kind, handler) {
  const listener = (ev) => {
    const msg = ev.data;
    if (!msg || msg.mo !== BRIDGE_PROTO || msg.kind !== kind) return;
    handler(msg);
  };
  window.addEventListener("message", listener);
  return () => window.removeEventListener("message", listener);
}

// src/mock.ts
var MOCK_CONTEXT = {
  app_id: "mock-app",
  user: { openid: "mock-openid", granted_scopes: [] },
  session_id: "mock-session",
  capabilities: ["get_weather", "get_local_weather"],
  query: ""
};
function getMockContext() {
  return { ...MOCK_CONTEXT };
}
function getMockResult(requestId, capabilityKey) {
  return {
    request_id: requestId,
    status: "ok",
    output: { _mock: true, capability: capabilityKey }
  };
}

// src/bridge.ts
var MoBridge = class {
  constructor() {
    this._context = null;
    this._contextPromise = null;
    this._mock = false;
    /** iframe UI 控制 */
    this.ui = {
      open: () => sendFire("ui-open"),
      resize: (width, height) => sendFire("ui-resize", { width, height }),
      close: () => sendFire("ui-close")
    };
  }
  /** 是否处于 mock 模式（无宿主） */
  get isMock() {
    return this._mock;
  }
  /**
   * 获取宿主注入的上下文。首次调用触发握手，后续调用返回缓存。
   */
  getContext() {
    if (this._contextPromise) return this._contextPromise;
    this._contextPromise = this._handshake();
    return this._contextPromise;
  }
  /**
   * 调用宿主能力，返回统一信封。
   */
  async invokeCapability(capabilityKey, args = {}, opts) {
    const ctx = await this.getContext();
    if (this._mock) {
      const id = `mock_${Date.now()}`;
      console.debug("[mocloud-frontend-sdk mock] invokeCapability", capabilityKey, args);
      return getMockResult(id, capabilityKey);
    }
    const timeout = opts?.timeout_ms ?? DEFAULT_INVOKE_TIMEOUT_MS;
    const resp = await sendRequest("invoke", { capability_key: capabilityKey, args }, timeout);
    return this._parseEnvelope(resp);
  }
  /** 埋点上报 */
  track(event, payload) {
    if (this._mock) {
      console.debug("[mocloud-frontend-sdk mock] track", event, payload);
      return;
    }
    sendFire("track", { event, payload });
  }
  /**
   * 监听宿主推送（如 consent-updated），返回取消函数。
   */
  onMessage(kind, handler) {
    return onHostMessage(kind, handler);
  }
  // ── 内部方法 ──
  async _handshake() {
    if (typeof window === "undefined" || window.parent === window) {
      this._mock = true;
      console.debug("[mocloud-frontend-sdk] No host detected, entering mock mode");
      return getMockContext();
    }
    try {
      const resp = await sendRequest("ready", {}, HANDSHAKE_TIMEOUT_MS);
      this._context = {
        app_id: resp.app_id ?? "",
        user: {
          openid: resp.openid ?? "",
          granted_scopes: resp.granted_scopes ?? []
        },
        session_id: resp.session_id ?? "",
        capabilities: resp.capabilities ?? [],
        query: resp.query,
        launchData: resp.launchData
      };
      return this._context;
    } catch {
      this._mock = true;
      console.debug("[mocloud-frontend-sdk] Handshake timeout, entering mock mode");
      return getMockContext();
    }
  }
  _parseEnvelope(msg) {
    return {
      request_id: msg.request_id ?? "",
      status: msg.status ?? "error",
      output: msg.output ?? {},
      render: msg.render,
      next_actions: msg.next_actions,
      error: msg.error
    };
  }
};
var bridge = new MoBridge();
export {
  BRIDGE_PROTO,
  bridge,
  onHostMessage
};
//# sourceMappingURL=index.js.map