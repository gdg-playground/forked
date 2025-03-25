ARG BUN_VERSION latest

FROM oven/bun:${BUN_VERSION:-1}-alpine AS installer
WORKDIR /app

COPY package.json bun.lock ./

RUN bun install --frozen-lockfile --production

FROM oven/bun:${BUN_VERSION:-1}-alpine AS runner

WORKDIR /app

COPY . .
COPY --from=installer /app/node_modules node_modules

EXPOSE 3000 

ENTRYPOINT ["bun", "start"]
