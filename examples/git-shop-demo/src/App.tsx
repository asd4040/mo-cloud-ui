import React from "react"
import {
  MoCard, MoCardHeader, MoCardContent, MoCardTitle,
  MoBadge, MoButton,
} from "@mo-cloud/ui"
import { bridge } from "@mocloud/frontend-sdk"

// ─── Bridge 协议 ────────────────────────────────────────────────────

async function invokeCapability(capabilityKey: string, args: Record<string, unknown> = {}): Promise<unknown> {
  const result = await bridge.invokeCapability(capabilityKey, args)
  if (result.status === "error") throw new Error(result.error?.message ?? "invoke failed")
  const output = result.output
  if (output && output.code === 0 && "data" in output) return output.data
  return output
}

// ─── 类型 ────────────────────────────────────────────────────────────

interface Product {
  id: string
  name: string
  price: number
  image?: string
  tag?: string
  desc?: string
  sales?: number
}

interface ProductDetail extends Product {
  specs?: { label: string; value: string }[]
  stock?: number
  rating?: number
}

interface ShopData {
  title?: string
  currency?: string
  products: Product[]
}

// ─── Mock 数据 ──────────────────────────────────────────────────────

const mockProducts: ShopData = {
  title: "精选好物",
  currency: "¥",
  products: [
    { id: "p001", name: "AirPods Pro 2", price: 1899, desc: "USB-C / 主动降噪", tag: "热卖", sales: 2680 },
    { id: "p002", name: "Apple Watch S10", price: 2999, desc: "46mm / GPS版", sales: 1520 },
    { id: "p003", name: "iPad mini 7", price: 3999, desc: "A17 Pro / 8.3寸", tag: "新品", sales: 890 },
    { id: "p004", name: "MagSafe 充电器", price: 299, desc: "15W 无线快充", sales: 5230 },
  ],
}

const mockDetail: ProductDetail = {
  id: "p001", name: "AirPods Pro 2", price: 1899,
  desc: "全新 H2 芯片，自适应降噪，个性化空间音频，USB-C 充电盒带扬声器。",
  tag: "热卖", sales: 2680, stock: 128, rating: 4.8,
  specs: [
    { label: "芯片", value: "Apple H2" },
    { label: "降噪", value: "主动降噪 + 通透模式" },
    { label: "续航", value: "6小时（降噪开启）" },
    { label: "充电接口", value: "USB-C" },
  ],
}

// ─── 组件 ────────────────────────────────────────────────────────────

type View = "list" | "detail"

export function App() {
  const [view, setView] = React.useState<View>("list")
  const [products, setProducts] = React.useState<Product[]>(mockProducts.products)
  const [shopTitle, setShopTitle] = React.useState(mockProducts.title ?? "商城")
  const [detail, setDetail] = React.useState<ProductDetail | null>(null)
  const [searchText, setSearchText] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [bridgeStatus, setBridgeStatus] = React.useState<"connecting" | "authed" | "loaded" | "error">("connecting")
  const [caps, setCaps] = React.useState<string[]>([])
  const currency = "¥"

  // ── Bridge 握手 ──
  React.useEffect(() => {
    bridge.getContext().then(context => {
      if (bridge.isMock) {
        setBridgeStatus("error")
        return
      }
        const capabilities = context.capabilities
        setCaps(capabilities)
        setBridgeStatus("authed")

        // 自动调用 get_products 加载商品列表
        const listCap = capabilities.find(c => c.includes("get_products")) ?? capabilities[0]
        if (listCap) {
          setLoading(true)
          invokeCapability(listCap, { meta: "false" })
            .then(output => {
              console.log("[shop] get_products 返回:", output)
              const d = output as ShopData
              if (d && Array.isArray(d.products)) {
                setProducts(d.products)
                if (d.title) setShopTitle(d.title)
                setBridgeStatus("loaded")
              }
            })
            .catch(err => {
              console.warn("[shop] get_products 失败:", err.message)
              setBridgeStatus("error")
            })
            .finally(() => setLoading(false))
        } else {
          setBridgeStatus("error")
        }
    }).catch(error => {
      console.warn("[shop] Bridge 握手失败:", error)
      setBridgeStatus("error")
    })
  }, [])

  // ── 搜索商品 ──
  const handleSearch = () => {
    const searchCap = caps.find(c => c.includes("search"))
    if (searchCap && searchText.trim()) {
      setLoading(true)
      invokeCapability(searchCap, { keyword: searchText.trim() })
        .then(output => {
          console.log("[shop] search_products 返回:", output)
          const d = output as ShopData
          if (d && Array.isArray(d.products)) {
            setProducts(d.products)
            if (d.title) setShopTitle(d.title)
          }
        })
        .catch(err => console.warn("[shop] search 失败:", err.message))
        .finally(() => setLoading(false))
    } else {
      // 本地过滤
      const filtered = mockProducts.products.filter(p =>
        p.name.includes(searchText) || p.desc?.includes(searchText)
      )
      setProducts(filtered.length ? filtered : mockProducts.products)
    }
  }

  // ── 查看详情 ──
  const handleDetail = (product: Product) => {
    const detailCap = caps.find(c => c.includes("detail"))
    if (detailCap) {
      setLoading(true)
      invokeCapability(detailCap, { product_id: product.id })
        .then(output => {
          console.log("[shop] get_product_detail 返回:", output)
          const d = output as ProductDetail
          if (d && d.id) {
            setDetail(d)
            setView("detail")
          }
        })
        .catch(err => console.warn("[shop] detail 失败:", err.message))
        .finally(() => setLoading(false))
    } else {
      // 本地 mock
      setDetail({ ...mockDetail, ...product })
      setView("detail")
    }
  }

  // ── 返回列表 ──
  const handleBack = () => {
    setView("list")
    setDetail(null)
  }

  // ─── 渲染 ─────────────────────────────────────────────────────────

  return (
    <>
      <MoCard style={{ maxWidth: 420, margin: "16px auto" }}>
        {view === "list" ? (
          <>
            <MoCardHeader>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <MoCardTitle>{shopTitle}</MoCardTitle>
                <MoBadge>{products.length} 件</MoBadge>
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <input
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSearch()}
                  placeholder="搜索商品..."
                  style={{ flex: 1, padding: "6px 12px", borderRadius: 8, fontSize: 13, border: "1px solid var(--dp-border, #e5e7eb)", outline: "none", background: "var(--dp-surface-2, #f9fafb)" }}
                />
                <MoButton variant="primary" size="sm" onClick={handleSearch}>搜索</MoButton>
              </div>
            </MoCardHeader>

            <MoCardContent>
              {loading ? (
                <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>加载中...</div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {products.map(p => (
                    <div key={p.id} onClick={() => handleDetail(p)} style={{ display: "flex", alignItems: "center", gap: 12, padding: 10, background: "var(--dp-surface-2, #f9fafb)", borderRadius: 10, border: "1px solid var(--dp-border, #f3f4f6)", cursor: "pointer", transition: "box-shadow .15s" }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,.08)")}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
                    >
                      <div style={{ width: 56, height: 56, borderRadius: 10, flexShrink: 0, background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, position: "relative" }}>
                        🛍️
                        {p.tag && <span style={{ position: "absolute", top: -4, right: -4, background: p.tag === "新品" ? "#2563eb" : "#ef4444", color: "#fff", fontSize: 9, padding: "1px 5px", borderRadius: 4, fontWeight: 600 }}>{p.tag}</span>}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--dp-text, #111827)" }}>{p.name}</div>
                        {p.desc && <div style={{ fontSize: 11, color: "var(--dp-text-3, #9ca3af)", marginTop: 2 }}>{p.desc}</div>}
                        {p.sales != null && <div style={{ fontSize: 11, color: "var(--dp-text-3, #9ca3af)", marginTop: 1 }}>已售 {p.sales}</div>}
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--dp-primary-text, #dc2626)" }}>{currency}{p.price.toFixed(2)}</div>
                        <div style={{ fontSize: 11, color: "var(--dp-text-3, #9ca3af)", marginTop: 2 }}>查看详情 →</div>
                      </div>
                    </div>
                  ))}
                  {products.length === 0 && <div style={{ textAlign: "center", padding: 20, color: "#9ca3af", fontSize: 13 }}>没有找到商品</div>}
                </div>
              )}
            </MoCardContent>
          </>
        ) : detail ? (
          <>
            <MoCardHeader>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MoButton variant="default" size="sm" onClick={handleBack}>← 返回</MoButton>
                <MoCardTitle>商品详情</MoCardTitle>
              </div>
            </MoCardHeader>
            <MoCardContent>
              {loading ? <div style={{ textAlign: "center", padding: 30, color: "#9ca3af", fontSize: 13 }}>加载中...</div> : (
                <>
                  <div style={{ width: "100%", height: 160, borderRadius: 12, background: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56, marginBottom: 16, position: "relative" }}>
                    🛍️
                    {detail.tag && <span style={{ position: "absolute", top: 10, right: 10, background: detail.tag === "新品" ? "#2563eb" : "#ef4444", color: "#fff", fontSize: 12, padding: "3px 10px", borderRadius: 6, fontWeight: 600 }}>{detail.tag}</span>}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "var(--dp-text, #111827)" }}>{detail.name}</div>
                      {detail.desc && <div style={{ fontSize: 13, color: "var(--dp-text-2, #6b7280)", marginTop: 4, lineHeight: 1.5 }}>{detail.desc}</div>}
                    </div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: "var(--dp-primary-text, #dc2626)", flexShrink: 0, marginLeft: 12 }}>{currency}{detail.price.toFixed(2)}</div>
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
                    {detail.sales != null && <MoBadge>已售 {detail.sales}</MoBadge>}
                    {detail.stock != null && <MoBadge>库存 {detail.stock}</MoBadge>}
                    {detail.rating != null && <MoBadge>⭐ {detail.rating}</MoBadge>}
                  </div>
                  {detail.specs && detail.specs.length > 0 && (
                    <div style={{ marginTop: 16 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--dp-text, #111827)", marginBottom: 8 }}>规格参数</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {detail.specs.map((s, i) => (
                          <div key={i} style={{ padding: "8px 10px", borderRadius: 8, background: "var(--dp-surface-2, #f9fafb)", border: "1px solid var(--dp-border, #f3f4f6)" }}>
                            <div style={{ fontSize: 11, color: "var(--dp-text-3, #9ca3af)" }}>{s.label}</div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--dp-text, #111827)", marginTop: 2 }}>{s.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: 16 }}>
                    <MoButton variant="primary" size="sm" style={{ width: "100%" }} onClick={() => {
                      bridge.track("card_action", { action: "buy", product_id: detail.id })
                      alert(`已加入购物车：${detail.name}`)
                    }}>立即购买 {currency}{detail.price.toFixed(2)}</MoButton>
                  </div>
                </>
              )}
            </MoCardContent>
          </>
        ) : null}
      </MoCard>

      <div style={{ maxWidth: 420, margin: "8px auto", padding: "6px 12px", fontSize: 11, color: "#9ca3af", display: "flex", alignItems: "center", gap: 6 }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: bridgeStatus === "loaded" ? "#22c55e" : bridgeStatus === "authed" ? "#eab308" : bridgeStatus === "error" ? "#ef4444" : "#9ca3af" }} />
        {{ connecting: "Bridge 连接中...", authed: "已授权，加载数据中...", loaded: "Bridge 就绪 · 真实数据", error: "独立模式 · Mock 数据" }[bridgeStatus]}
        {caps.length > 0 && <span style={{ marginLeft: 8 }}>能力：{caps.join(", ")}</span>}
      </div>
    </>
  )
}
