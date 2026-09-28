# FaultWright Demo

A standalone public presentation of FaultFoundry Demo V0: one frozen
software task, two deterministic reference controls, and the canonical
outcomes produced by the FaultFoundry evaluation engine.

## Local development

```bash
npm install
npm run dev
```

The site is presentation-only. It does not execute tasks, call model
providers, or calculate verification results. Canonical identities and
outcomes come from `public/demo/demo-v0.json`.

## Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Public-data boundary

Only `public/demo/demo-v0.json` and `public/demo/demo-v0-freeze.json`
were copied from the engine. No Python backend, Docker environment,
hidden verifier, oracle body, private task material, credentials, or
internal artifact tree belongs in this repository.

## Deployment

Import this repository into Vercel as a Next.js project with `./` as the
Root Directory. The framework-default build command is sufficient.
