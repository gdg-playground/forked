import {
  createCounter,
  getCount,
  incrementCount,
  resetCount,
} from "./functions";

const port = process.env.PORT ? Number.parseInt(process.env.PORT) : 3000;

await createCounter();

const server = Bun.serve({
  port,
  hostname: "0.0.0.0",
  routes: {
    async "/"() {
      const count = await getCount();

      return new Response(`Count: ${count}`);
    },
    async "/add"() {
      const updated = await incrementCount();

      return new Response(`Incremented: ${updated}`);
    },
    async "/reset"() {
      await resetCount();

      return new Response("Reset");
    },
    "/health"() {
      return new Response("OK");
    },
  },
});

console.log(`Server is running on http://${server.hostname}:${server.port}`);
