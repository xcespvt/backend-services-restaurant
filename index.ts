import Fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fastifyMultipart from "@fastify/multipart";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import fastifyCompress from "@fastify/compress";
import fastifyCookie from "@fastify/cookie";

// 🧠 Import DB functions
import { connectDB, testConnection } from "./config/db.ts";

// 📁 Route plugins (make sure each route file exports an async function)
import authRoutes from "./routes/restaurant/auth.routes.ts";
import branchRoutes from "./routes/restaurant/branch.routes.ts";
import menuRoutes from "./routes/restaurant/menu.routes.ts";
import orderRoutes from "./routes/restaurant/order.routes.ts";
import bookingRoutes from "./routes/restaurant/booking.routes.ts";
import tableRoutes from "./routes/restaurant/table.routes.ts";
import feedbackRoutes from "./routes/restaurant/feedback.routes.ts";
import refundRoutes from "./routes/restaurant/refund.routes.ts";
import settingRoutes from "./routes/restaurant/setting.routes.ts";
import analyticsRoutes from "./routes/restaurant/analytics.routes.ts";
import offersRoutes from "./routes/restaurant/offers.routes.ts";
import promotionRoutes from "./routes/restaurant/promotion.routes.ts";

const app: FastifyInstance = Fastify({ logger: false });
const port = process.env.PORT || 3000;

app.register(helmet);
app.register(cors, {
  origin: [
    "https://n-i-g-x-gu-uc-3qj-restaurant.vercel.app",
    "https://localhost",
    "http://localhost",
    "capacitor://localhost",
    "http://localhost:3000"
  ],
  methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS", "PATCH"],
  credentials: true,
  exposedHeaders: ["set-cookie"],
});

app.register(fastifyCompress);
// 🍪 Cookie plugin
app.register(fastifyCookie, {
  hook: "onRequest",
});

// Allow multipart form-data
app.register(fastifyMultipart);

// 📦 Register route modules with prefixes
app.register(authRoutes, { prefix: "/api/auth" });
app.register(branchRoutes, { prefix: "/api/branches" });
app.register(menuRoutes, { prefix: "/api/menu" });
app.register(orderRoutes, { prefix: "/api/orders" });
app.register(bookingRoutes, { prefix: "/api/bookings" });
app.register(tableRoutes, { prefix: "/api/tables" });
app.register(feedbackRoutes, { prefix: "/api/feedback" });
app.register(refundRoutes, { prefix: "/api/refunds" });
app.register(settingRoutes, { prefix: "/api/settings" });
app.register(analyticsRoutes, { prefix: "/api/analytics" });
app.register(offersRoutes, { prefix: "/api/offers" });
app.register(promotionRoutes, { prefix: "/api/promotions" });

app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return {
    message: "Welcome to Crevings Restaurant Management System API",
  };
});

// 🩺 Health check
app.get("/health", async (request: FastifyRequest, reply: FastifyReply) => {
  return {
    status: "ok",
    message: "Server is running",
  };
});

// 🔌 Initialize DB + Start server
const initializeApp = async () => {
  try {
    await connectDB();
    const connected = await testConnection();

    if (!connected) {
      throw new Error("MongoDB is not connected");
    }

    app.log.info("✅ Database connection successful");

    await app.listen({ port: Number(port), host: "0.0.0.0" });
    app.log.info(`🚀 Server is running at http://0.0.0.0:${port}`);
  } catch (error: any) {
    console.error("❌ Failed to initialize app:", error);
    process.exit(1);
  }
};

initializeApp();

export default app;

