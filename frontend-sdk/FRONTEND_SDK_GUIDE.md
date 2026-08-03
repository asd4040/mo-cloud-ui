# Frontend Bridge Helper Guide

`sdk/frontend` is the frontend Bridge/render-schema helper for mo-cloud apps that run inside host-controlled surfaces.

It is **not** the third-party App development framework. The App framework is defined by the App manifest, capability contracts, surface contracts, optional embedded UI bundle, provider endpoint contract, sandbox fixtures, and review package.

It contains:

- Bridge client for frontend app views
- Host message protocol helpers
- Capability invocation helpers
- Mock context/result helpers for local preview
- Render schema TypeScript types

It does not own manifest validation, backend transports, provider signing, connector runtimes, bundle upload, sandbox preview, or app publishing APIs.

## Package Name

```ts
import { bridge } from "@mocloud/frontend-sdk"
```

The current package name is:

```text
@mocloud/frontend-sdk
```

## Runtime Flow

1. Frontend app calls `bridge.getContext()`.
2. The helper sends `ready` to the host.
3. Host responds with auth context.
4. Frontend app calls `bridge.invokeCapability(capabilityKey, args)`.
5. Host validates permission and forwards the capability request.
6. The helper returns the standard result envelope.

## Local Development

Outside a host iframe, the helper falls back to mock mode. This lets frontend developers build and preview UI without a running mo-cloud host.

```ts
const ctx = await bridge.getContext()
const res = await bridge.invokeCapability("get_weather", {
  latitude: 29.56,
  longitude: 106.55,
})
```

## Directory

```text
sdk/frontend/
  src/
    bridge.ts
    constants.ts
    index.ts
    mock.ts
    rpc.ts
    types.ts
  preview/
    App.tsx
```

## Boundaries

- `sdk/frontend` is for embedded-view frontend developers only.
- Render schema types are exported for compile-time use, but production card rendering belongs to each consuming frontend surface.
- Do not add platform governance, publishing, or connector runtime logic here.
