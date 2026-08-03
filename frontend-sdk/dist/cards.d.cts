/**
 * ============================================================================
 * 通用卡片 Schema 类型定义
 *
 * 与 ResultEnvelope.render (RenderHint) 配合使用：
 *   - RenderHint.schema 标识 schema 类型，如 "card.v1" / "table.v1" / "list.v1"
 *   - RenderHint.data 按对应 CardSchema 子类型填充
 *
 * 保持与现有 DeclarativeCardData (card.v1) 完全兼容：
 *   CardViewData 即为 card.v1 的超集，原有字段不变。
 * ============================================================================
 */
type CardSchema = CardViewData | TableViewData | ListViewData | AppViewData;
interface CardViewData {
    type: "card";
    title?: string;
    subtitle?: string;
    description?: string;
    icon?: string;
    facts?: CardFact[];
    actions?: CardAction[];
}
interface CardFact {
    label: string;
    value: string | number | boolean;
    format?: FieldFormat;
}
type FieldFormat = "text" | "number" | "date" | "temperature" | "percentage" | "url" | "badge";
interface TableViewData {
    type: "table";
    title?: string;
    columns: TableColumn[];
    rows: Record<string, unknown>[];
    actions?: CardAction[];
}
interface TableColumn {
    key: string;
    label: string;
    format?: FieldFormat;
    width?: string;
}
interface ListViewData {
    type: "list";
    title?: string;
    items: ListItem[];
    actions?: CardAction[];
}
interface ListItem {
    key: string;
    primary: string;
    secondary?: string;
    icon?: string;
    actions?: CardAction[];
}
interface AppViewData {
    type: "app_view";
    title?: string;
    children: CardSchema[];
    layout?: "stack" | "grid";
    actions?: CardAction[];
}
interface CardAction {
    label: string;
    capability_id?: string;
    action?: string;
    app_id?: string;
    args?: Record<string, unknown>;
    requires_confirm?: boolean;
}

export type { AppViewData, CardAction, CardFact, CardSchema, CardViewData, FieldFormat, ListItem, ListViewData, TableColumn, TableViewData };
