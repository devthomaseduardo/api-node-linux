import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { prisma } from "./lib/prisma.js";

const app = Fastify({
  logger: true,
});

app.register(cors, {
  origin: true,
});

app.get("/health", async () => {
  return {
    status: "ok",
    service: "api-node-linux",
    timestamp: new Date().toISOString(),
  };
});

app.post("/clients", async (request, reply) => {
  const body = request.body as {
    name?: string;
    email?: string;
    phone?: string;
  };

  if (!body.name || !body.email) {
    return reply.status(400).send({
      error: "name and email are required",
    });
  }

  try {
    const client = await prisma.client.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone ?? null,
      },
    });

    return reply.status(201).send(client);
  } catch (error) {
    const prismaError = error as {
      code?: string;
    };

    if (prismaError.code === "P2002") {
      return reply.status(409).send({
        error: "client email already exists",
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      error: "internal server error",
    });
  }
});

app.get("/clients", async () => {
  const clients = await prisma.client.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      projects: true,
    },
  });

  return clients;
});
app.get("/projects", async () => {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      client: true,
    },
  });

  return projects;
});

app.post("/projects", async (request, reply) => {
  const body = request.body as {
    name?: string;
    clientId?: string;
    status?: string;
  };

  if (!body.name || !body.clientId) {
    return reply.status(400).send({
      error: "name and clientId are required",
    });
  }

  try {
    const project = await prisma.project.create({
      data: {
        name: body.name,
        clientId: body.clientId,
        status: body.status ?? "active",
      },
      include: {
        client: true,
      },
    });

    return reply.status(201).send(project);
  } catch (error) {
    const prismaError = error as {
      code?: string;
    };

    if (prismaError.code === "P2003") {
      return reply.status(400).send({
        error: "client does not exist",
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      error: "internal server error",
    });
  }
});

app.patch("/projects/:id/status", async (request, reply) => {
  const params = request.params as {
    id: string;
  };

  const body = request.body as {
    status?: string;
  };

  if (!body.status) {
    return reply.status(400).send({
      error: "status is required",
    });
  }

  try {
    const project = await prisma.project.update({
      where: {
        id: params.id,
      },
      data: {
        status: body.status,
      },
      include: {
        client: true,
      },
    });

    return project;
  } catch (error) {
    const prismaError = error as {
      code?: string;
    };

    if (prismaError.code === "P2025") {
      return reply.status(404).send({
        error: "project not found",
      });
    }

    request.log.error(error);

    return reply.status(500).send({
      error: "internal server error",
    });
  }
});




    
const port = Number(process.env.PORT ?? 3333);
const host = process.env.HOST ?? "0.0.0.0";

app.listen({ port, host }).then(() => {
  console.log(`API running on http://${host}:${port}`);
});