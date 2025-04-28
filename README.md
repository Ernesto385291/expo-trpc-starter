# expo-trpc-starter

A minimal, up-to-date Expo + tRPC starter template inspired by the T3 Stack.

## 🚀 Features

- **Expo**: Rapid React Native development with Expo.
- **tRPC**: End-to-end typesafe APIs—no REST, no GraphQL, just types!
- **Expo API Routes**: Uses Expo’s built-in API routes for serverless endpoints.
- **Minimal & Modern**: No unnecessary boilerplate, just the essentials.
- **TypeScript**: Full type safety across client and server.

## 🛠️ Getting Started

```bash
git clone https://github.com/Ernesto385291/expo-trpc-starter
cd expo-trpc-starter
cp .env.example .env
bun install
bun run start
```

## ⚠️ Real Device Networking

**If you are running the app on a real mobile device (not a simulator/emulator), your device cannot access your computer's `localhost` or `127.0.0.1` directly.**

To make tRPC API calls work on a real device, you need to expose your local development server to the internet using a tunneling service like [ngrok](https://ngrok.com/) or [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/).

1. Start your Expo project.
2. Start a tunnel to your local server using a service like ngrok or Cloudflare Tunnel.
3. Update your tRPC client to use the public URL provided by the tunnel.

**Without this, all tRPC calls from your device will fail!**

## 📦 Stack

- [Expo](https://expo.dev/)
- [tRPC](https://trpc.io/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)

## 📚 Inspiration

Inspired by the [T3 Stack](https://create.t3.gg/) and the need for a simple, up-to-date example of tRPC with Expo’s API routes.

## 🤝 Contributing

PRs and issues welcome!

---

**Note:** This template is intentionally minimal. For more advanced features (auth, database, etc.), check out the T3 Stack or contribute to this repo!
