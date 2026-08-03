# Frontend JavaScript Bridge Guide

This package is the lightweight JavaScript Bridge helper for MoCloud apps that run inside host-controlled surfaces.

It is **not** the third-party App development framework. The App framework is defined by the App manifest, capability contracts, surface contracts, optional embedded UI bundle, provider endpoint contract, sandbox fixtures, and review package.

It contains only the interaction runtime:

- Bridge client for frontend app views
- Host message protocol helpers
- Capability invocation helpers
- Mock context/result helpers for local preview

It does not contain UI components, manifest validation, backend transports, bundle upload, or publishing APIs.

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
frontend-sdk/
  src/
    bridge.ts
    constants.ts
    index.ts
    mock.ts
    rpc.ts
    types.ts
```

## Boundaries

- `frontend-sdk` is framework-independent JavaScript and can be used from React, Vue, or plain HTML.
- UI components remain in the separate `@mo-cloud/ui` package.
- Do not add platform governance, publishing, or connector runtime logic here.
