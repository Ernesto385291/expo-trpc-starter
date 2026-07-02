# expo-trpc-starter

[![CI](https://github.com/Ernesto385291/expo-trpc-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/Ernesto385291/expo-trpc-starter/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

A minimal Expo Router + tRPC starter for building type-safe React Native and web apps with Expo API Routes.

This template is intentionally small: no auth provider, no database adapter, no design system, and no generated app shell to delete later. It gives you the wiring that is easy to get wrong: Expo Router API routes, tRPC, TanStack Query, SuperJSON, environment variables, and native networking.

## Features

- Expo SDK 57 with Expo Router
- tRPC v11 with end-to-end types
- Expo API Routes at `src/app/api`
- TanStack Query configured for React Native focus and network status
- SuperJSON on the client and server
- Optional `EXPO_PUBLIC_API_URL` override for separate API hosting
- TypeScript, ESLint, and Expo Doctor scripts
- Bun lockfile and install workflow

## Prerequisites

- [Bun](https://bun.sh/)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/)
- Xcode for iOS simulator or Android Studio for Android emulator
- Expo Go or a development build for testing on a real device

## Quick Start

```bash
git clone https://github.com/Ernesto385291/expo-trpc-starter
cd expo-trpc-starter
cp .env.example .env
bun install
bun run start
```

Then press:

- `i` to open iOS simulator
- `a` to open Android emulator
- `w` to open web
- scan the QR code from Expo Go on a real device

## Scripts

```bash
bun run start       # Start Expo
bun run ios         # Start Expo and open iOS
bun run android     # Start Expo and open Android
bun run web         # Start Expo for web
bun run typecheck   # Run TypeScript
bun run lint        # Run Expo ESLint
bunx expo-doctor    # Check Expo project health
```

## Project Structure

```txt
src/
  app/
    _layout.tsx              # App providers and navigation shell
    index.tsx                # Example screen
    api/trpc/[trpc]+api.ts   # Expo API Route for tRPC
  components/
    hello.tsx                # Example tRPC query consumer
  server/
    env.js                   # Server-side env validation
    api/
      root.ts                # App router
      trpc.ts                # tRPC setup
      routers/post.ts        # Example router
  trpc/
    query-client.ts          # TanStack Query defaults
    react.tsx                # tRPC React provider/client
```

## How tRPC Is Wired

The server route lives at:

```txt
src/app/api/trpc/[trpc]+api.ts
```

The client points to:

```ts
url: "/api/trpc"
```

That relative URL is intentional. In development, Expo Router resolves relative requests against the Expo dev server origin. This means real devices, simulators, emulators, and web can share the same client config without hardcoding `localhost`, `127.0.0.1`, or `10.0.2.2`.

Do not pass `expo/fetch` directly to tRPC when using a relative URL. The starter relies on Expo Router's global fetch behavior for relative API route requests. If you use an absolute `EXPO_PUBLIC_API_URL`, a custom fetch can be added later if you need one.

## Environment Variables

Client-visible variables must be prefixed with `EXPO_PUBLIC_`.

```bash
EXPO_PUBLIC_API_URL=
```

Leave `EXPO_PUBLIC_API_URL` empty for local development with Expo Router API Routes.

Set it only when the API is hosted separately from the app:

```bash
EXPO_PUBLIC_API_URL=https://api.example.com
```

Server-side validation lives in `src/server/env.js`. Do not import that file from screens, components, or other client-side modules.

## Real Device Networking

You usually do not need ngrok for local development on a real device.

Use the default setup when:

- your phone and computer are on the same Wi-Fi network
- Expo is running in LAN mode
- your firewall allows the Expo dev server port, usually `8081`

Use ngrok, Cloudflare Tunnel, or another tunnel only when:

- the device is not on the same network
- the network blocks device-to-device traffic
- you are testing remotely
- you need a public HTTPS URL
- you are testing a production native build against a local server

For production native builds that call Expo Router API Routes, deploy the server and configure the Expo Router `origin` in `app.json`, or set `EXPO_PUBLIC_API_URL` to your deployed API origin.

## Adding API Routes

Create a router:

```ts
// src/server/api/routers/user.ts
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({
  byId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input }) => {
      return { id: input.id, name: "Ada" };
    }),
});
```

Add it to the root router:

```ts
// src/server/api/root.ts
export const appRouter = createTRPCRouter({
  user: userRouter,
});
```

Use it from React:

```tsx
const [user] = api.user.byId.useSuspenseQuery({ id: "1" });
```

## Quality Checks

Before opening a PR, run:

```bash
bun run typecheck
bun run lint
bunx expo-doctor
```

For networking changes, also run the app on at least one native target.

## Troubleshooting

### The app is stuck on `Loading...`

Check the Metro logs. You should see a tRPC request and response:

```txt
>> query post.hello
<< query post.hello
```

If you only see the outgoing request, restart Expo with a clean cache:

```bash
bun run start -- --clear
```

Also confirm that `src/trpc/react.tsx` is using `/api/trpc` and is not passing `expo/fetch` directly to `httpBatchLink`.

### Server environment variable error on the client

Only import `src/server/env.js` from server-side files. Client code should read public values with static dot notation:

```ts
process.env.EXPO_PUBLIC_API_URL
```

### Real device cannot reach the API

Make sure the device and computer are on the same network, Expo is in LAN mode, and your firewall allows the dev server port. Use a tunnel only if LAN access is blocked or unavailable.

## Contributing

Contributions are welcome. See [CONTRIBUTING.md](./CONTRIBUTING.md) for local setup, commit expectations, and PR guidelines.

Good first contributions:

- improve docs and examples
- add optional auth/database recipes
- add tests for common starter flows
- improve platform-specific troubleshooting
- keep Expo/tRPC dependency upgrades smooth

## Security

Please do not open public issues for security reports. See [SECURITY.md](./SECURITY.md).

## Changelog

See [CHANGELOG.md](./CHANGELOG.md).

## License

MIT. See [LICENSE](./LICENSE).
