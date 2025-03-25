# Cloud Native Playground

This is a simple counter application that uses PostgreSQL as a database.

## Local Development

```bash
bun src/index.ts
```

## Swarm Stack

```bash
docker swarm init
docker stack deploy --compose-file docker-compose.yml counter-stack

docker stack rm counter-stack
```
