# Contributing

Thanks for helping improve `expo-trpc-starter`.

This project is meant to stay small, practical, and easy to copy into a real app. Changes should preserve that spirit.

## Local Setup

```bash
git clone https://github.com/Ernesto385291/expo-trpc-starter
cd expo-trpc-starter
cp .env.example .env
bun install
bun run start
```

## Before You Open a PR

Run:

```bash
bun run typecheck
bun run lint
bunx expo-doctor
```

If your change touches networking, routing, or native behavior, test at least one native target.

## Pull Request Guidelines

- Keep starter code minimal and easy to understand.
- Prefer documented Expo, tRPC, and TanStack Query patterns.
- Update README or comments when behavior changes.
- Avoid adding auth, database, UI kits, or deployment vendors as defaults.
- Add optional integrations as docs or examples unless they are core to the starter.

## Commit Style

Use clear, boring commit messages:

```txt
fix: resolve native trpc api route requests
docs: clarify real device networking
chore: update expo sdk dependencies
```

## Reporting Bugs

When filing a bug, include:

- platform: iOS, Android, web, Expo Go, or development build
- package manager and Bun version
- exact command you ran
- Metro/terminal logs
- whether the issue happens on simulator/emulator, real device, or both

## Asking Questions

Open a discussion or issue with enough context to reproduce what you are seeing. Small repro steps beat long screenshots every time.
