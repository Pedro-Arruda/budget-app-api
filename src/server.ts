import cors from "@fastify/cors";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUI from "@fastify/swagger-ui";
import dotenv from "dotenv";
import fastify from "fastify";
import {
  ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import { PluggyClient } from "pluggy-sdk";
import accountRoutes from "./routes/account.routes";
import authRoutes from "./routes/auth.routes";
import fixedExpensesRoutes from "./routes/fixed-expenses.routes";
import invoicesRoutes from "./routes/invoices.routes";
import transactionRoutes from "./routes/transaction.routes";
import { CLIENT_ID, CLIENT_SECRET } from "./utils/constants";
import { syncAccount } from "./utils/syncAccount";
import { syncCategories } from "./utils/syncCategories";
import { syncTransactions } from "./utils/syncTransactions";

dotenv.config();

const app = fastify({
  pluginTimeout: 0,
}).withTypeProvider<ZodTypeProvider>();
app.register(cors, { origin: "*" });

const clientId = CLIENT_ID;
const clientSecret = CLIENT_SECRET;
const itemId = "cc884117-f5b2-4774-97f9-694dd0b8762f";

const client = new PluggyClient({
  clientId,
  clientSecret,
});

// Configuração de hooks e plugins
app.addHook("onReady", async () => {
  try {
    const accountId = await syncAccount(client, itemId);
    await syncCategories(client);
    await syncTransactions(client, accountId);
  } catch (error: any) {
    throw new Error("Failed to exchange token: " + error.message);
  }
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

// Swagger
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "SampleApi",
      description: "Sample backend service",
      version: "1.0.0",
    },
    servers: [],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUI, {
  routePrefix: "/",
});

// Rotas
app
  .withTypeProvider<ZodTypeProvider>()
  .register(authRoutes, { prefix: "/auth" })
  .register(transactionRoutes, { prefix: "/transactions" })
  .register(accountRoutes, { prefix: "/accounts" })
  .register(fixedExpensesRoutes, { prefix: "/fixed-expenses" })
  .register(invoicesRoutes, { prefix: "/invoices" });

// Webhook
app.post("/webhook", async (req: any, res) => {
  const { itemId, event } = req.body;

  if (event === "UPDATED") {
    try {
      const item = await client.fetchItem(itemId);
      const accounts = await client.fetchAccounts(itemId);
      const transactions = await client.fetchTransactions(itemId);
      res.status(200).send({ message: "TEST" });
    } catch (error) {
      console.error("Erro ao atualizar informações do item:", error);
      res.status(500).send({ message: "TEST" });
    }
  } else {
    res.status(200).send({ message: "TEST" });
  }
});

export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit("request", req, res);
}
