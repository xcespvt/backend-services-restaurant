import Fastify from 'fastify';


import helmet from '@fastify/helmet';
import cors from '@fastify/cors';
import compression from 'compression';




// 🧠 Import DB functions
import { connectDB, testConnection } from './config/db.js';

// 📁 Route plugins (make sure each route file exports an async function)
import restaurantRoutes from './routes/restaurant.routes.js';
import authRoutes from './routes/auth.routes.js';
import branchRoutes from './routes/branch.routes.js';
import menuRoutes from './routes/menu.routes.js';
import orderRoutes from './routes/order.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import tableRoutes from './routes/table.routes.js';
import feedbackRoutes from './routes/feedback.routes.js';
import refundRoutes from './routes/refund.routes.js';
import settingRoutes from './routes/setting.routes.js';
import analyticsRoutes from './routes/analytics.routes.js';
import offersRoutes from './routes/offers.routes.js';


const app = Fastify({ logger: false });
const port = process.env.PORT || 3000;


app.register(helmet);
app.register(cors, { 
  origin: '*', // Allow requests from all origins
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  credentials: true
});
app.register(compression());

// 📦 Register route modules with prefixes
app.register(restaurantRoutes, { prefix: '/restaurant' });
app.register(authRoutes, { prefix: '/api/auth' });
app.register(branchRoutes, { prefix: '/api/branches' });
app.register(menuRoutes, { prefix: '/api/menu' });
app.register(orderRoutes, { prefix: '/api/orders' });
app.register(bookingRoutes, { prefix: '/api/bookings' });
app.register(tableRoutes, { prefix: '/api/tables' });
app.register(feedbackRoutes, { prefix: '/api/feedback' });
app.register(refundRoutes, { prefix: '/api/refunds' });
app.register(settingRoutes, { prefix: '/api/settings' });
app.register(analyticsRoutes, { prefix: '/api/analytics' });
app.register(offersRoutes, { prefix: '/api/offers' });

app.get('/', async (req, reply) => {
  return {
    message: 'Welcome to XCES Restaurant Management System API',
  };
});

// 🩺 Health check
app.get('/health', async (req, reply) => {
  return {
    status: 'ok',
    message: 'Server is running',
  };
});

// 🔌 Initialize DB + Start server
const initializeApp = async () => {
  try {
    await connectDB();
    const connected = await testConnection();

    if (!connected) {
      throw new Error('MongoDB is not connected');
    }

    app.log.info('✅ Database connection successful');

    await app.listen({ port, host: '0.0.0.0' });
    app.log.info(`🚀 Server is running at http://0.0.0.0:${port}`);
  } catch (error) {
    app.log.error('❌ Failed to initialize app:', error);
    process.exit(1);
  }
};

initializeApp();

export default app;
