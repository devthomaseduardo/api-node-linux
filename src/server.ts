import Fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";

const app = Fastify({
  logger: true,
});

await app.register(cors, {
  origin: true,
});

app.get("/health", async () => {
  return {
    status: "ok",
    service: "api-node-linux",
    timestamp: new Date().toISOString(),
  };
});

const port = Number(process.env.PORT) || 3333;
const host = process.env.HOST || "0.0.0.0";

try {
  await app.listen({ port, host });
  console.log(`API running on http://${host}:${port}`);
} catch (error) {
  app.log.error(error);
  process.exit(1);
}
