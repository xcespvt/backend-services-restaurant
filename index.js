import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import ultimateExpress from 'ultimate-express';

// 🧠 Import DB functions
import { connectDB, testConnection } from './config/db.js';

// 📁 Routes
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

// App init
const app = ultimateExpress();
const port = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// ⛓️ Initialize DB + App
const initializeApp = async () => {
  try {
    await connectDB(); // ✅ This is now called
    const connected = await testConnection(); // ✅ Confirm connected

    if (!connected) {
      throw new Error('MongoDB is not connected');
    }

    console.log('✅ Database connection successful');

    // Start server only if DB is connected
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://0.0.0.0:${port}`);
    });

  } catch (error) {
    console.error('❌ Failed to initialize app:', error.message);
    process.exit(1);
  }
};

initializeApp();

// Routes
app.use('/restaurant', restaurantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/branches', branchRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/refunds', refundRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/offers', offersRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to XCES Restaurant Management System API'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

export default app;
