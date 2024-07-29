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

export const app = fastify({
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

app
  .withTypeProvider<ZodTypeProvider>()
  .register(authRoutes, { prefix: "/auth" })
  .register(transactionRoutes, { prefix: "/transactions" })
  .register(accountRoutes, { prefix: "/accounts" })
  .register(fixedExpensesRoutes, { prefix: "/fixed-expenses" })
  .register(invoicesRoutes, { prefix: "/invoices" });

app.post("/webhook", async (req: any, res) => {
  const { itemId, event } = req.body;

  console.log("event fora do if ", event);

  if (event === "UPDATED") {
    console.log("ENTROU NO IF ");
    console.log("EVENT ", event);
    console.log("ITEM  ID ", itemId);

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

async function run() {
  await app.ready();

  await app.listen({
    port: 3000,
  });

  console.log(`Documentation running at http://localhost:3000/`);
}

run();
