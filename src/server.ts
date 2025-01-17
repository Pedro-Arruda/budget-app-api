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
import compoundInterestsRoutes from "./routes/compoundInterests.routes";
import fixedExpensesRoutes from "./routes/fixed-expenses.routes";
import incomesRoutes from "./routes/incomes";
import invoicesRoutes from "./routes/invoices.routes";
import itemRoutes from "./routes/item.routes";
import transactionRoutes from "./routes/transaction.routes";
import { CLIENT_ID, CLIENT_SECRET } from "./utils/constants";

dotenv.config();

const app = fastify({
  pluginTimeout: 0,
}).withTypeProvider<ZodTypeProvider>();
app.register(cors, { origin: "*" });

app.addHook("onReady", async () => {
  console.log("INICIANDO SINCRONIZACAO");

  try {
    // await prisma.fixedExpenses.deleteMany();
    // await prisma.incomes.deleteMany();
    // await prisma.invoices.deleteMany();
    // await prisma.transaction.deleteMany();
    // await prisma.category.deleteMany();
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
  .register(itemRoutes, { prefix: "/item" })
  .register(accountRoutes, { prefix: "/accounts" })
  .register(fixedExpensesRoutes, { prefix: "/fixed-expenses" })
  .register(invoicesRoutes, { prefix: "/invoices" })
  .register(incomesRoutes, { prefix: "/incomes" })
  .register(compoundInterestsRoutes, { prefix: "/compound-interests" });

export default async function handler(req: any, res: any) {
  await app.ready();
  app.server.emit("request", req, res);
}

async function run() {
  await app.ready();

  await app.listen({
    port: 3000,
  });

  console.log(`Documentation running at http://localhost:3000/`);
}

run();
