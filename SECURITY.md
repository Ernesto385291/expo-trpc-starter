# Security Policy

## Supported Versions

This starter tracks the current Expo SDK and current stable tRPC/TanStack Query releases where practical.

Security fixes should target `main`.

## Reporting a Vulnerability

Please do not open a public GitHub issue for security reports.

Email the maintainer or use GitHub private vulnerability reporting if it is enabled for the repository.

Include:

- affected files or dependencies
- reproduction steps
- expected impact
- suggested fix, if you have one

## Scope

Useful reports include:

- unsafe environment variable handling
- accidental secret exposure
- dependency vulnerabilities with a practical exploit path
- API route behavior that leaks data or bypasses validation

Out of scope:

- issues that only affect intentionally local development URLs
- generic dependency scanner output without a reachable path
- social engineering or spam reports
