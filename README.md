# Jaleel's blog

SvelteKit blog at [blog.jaleel.me](https://blog.jaleel.me), deployed on Vercel with a Neon Postgres database. The portfolio is at [jaleel.me](https://jaleel.me).

## Developing

Install dependencies with `pnpm install`, copy `.env.example` to `.env`, and configure the database and admin secrets before starting the app:

```sh
pnpm dev
```

The local Postgres service can be started with `pnpm db:start`. Set `DATABASE_URL` to that database and use `pnpm db:push` to apply the schema.

## Deploying to Vercel

Import this repository as a SvelteKit project. Use Node.js 22, `pnpm install --frozen-lockfile` as the install command, and `pnpm build` as the build command. The explicit Vercel adapter produces the deployment output; no standalone Node start command is needed.

Configure these server-side environment variables for each deployed environment:

- `DATABASE_URL`: the Neon **pooled** connection string, with `-pooler` in the hostname and `sslmode=require`. The application reuses one Postgres.js connection per function instance and closes idle connections after 20 seconds.
- `ADMIN_PASSWORD`: a strong admin login password.
- `SESSION_SECRET`: a long, random secret for signing admin sessions. Keep this private and stable across deployments; changing it invalidates existing sessions.

Use a separate database or Neon branch for previews when they must not access production data. Admin authentication fails closed when its secrets are missing.

Restore the existing database before routing production traffic, then add `blog.jaleel.me` as the project's production domain and configure the DNS records provided by Vercel.

For schema changes, backups, and restores, set `DATABASE_URL` to Neon's **direct** connection string in the shell running those commands, rather than changing the application's pooled production URL. Review schema changes before running `pnpm db:push` against production.

## Building locally

With the required environment variables configured:

```sh
pnpm build
pnpm preview
```

`pnpm preview` serves a local preview; Vercel runs the production deployment.
