# XCES Restaurant Management System API Implementation Guide

This document provides implementation guidance for the API endpoints required by the XCES Restaurant Management System.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Authentication Implementation](#authentication-implementation)
3. [Branches Implementation](#branches-implementation)
4. [Menu Implementation](#menu-implementation)
5. [Orders Implementation](#orders-implementation)
6. [Bookings Implementation](#bookings-implementation)
7. [Tables Implementation](#tables-implementation)
8. [Feedback Implementation](#feedback-implementation)
9. [Refunds Implementation](#refunds-implementation)
10. [Settings Implementation](#settings-implementation)
11. [Analytics Implementation](#analytics-implementation)

## Project Structure

The backend should follow this structure:

```
xces-backend-services/
├── config/
│   ├── db.js                  # Database configuration
│   └── auth.js                # Authentication configuration
├── controllers/
│   ├── authController.js      # Authentication controller
│   ├── branchController.js    # Branch management controller
│   ├── menuController.js      # Menu management controller
│   ├── orderController.js     # Order management controller
│   ├── bookingController.js   # Booking management controller
│   ├── tableController.js     # Table management controller
│   ├── feedbackController.js  # Feedback management controller
│   ├── refundController.js    # Refund management controller
│   ├── settingController.js   # Settings management controller
│   └── analyticsController.js # Analytics controller
├── models/
│   ├── userModel.js           # User model
│   ├── branchModel.js         # Branch model
│   ├── menuModel.js           # Menu model
│   ├── orderModel.js          # Order model
│   ├── bookingModel.js        # Booking model
│   ├── tableModel.js          # Table model
│   ├── feedbackModel.js       # Feedback model
│   ├── refundModel.js         # Refund model
│   └── settingModel.js        # Settings model
├── routes/
│   ├── authRoutes.js          # Authentication routes
│   ├── branchRoutes.js        # Branch management routes
│   ├── menuRoutes.js          # Menu management routes
│   ├── orderRoutes.js         # Order management routes
│   ├── bookingRoutes.js       # Booking management routes
│   ├── tableRoutes.js         # Table management routes
│   ├── feedbackRoutes.js      # Feedback management routes
│   ├── refundRoutes.js        # Refund management routes
│   ├── settingRoutes.js       # Settings management routes
│   └── analyticsRoutes.js     # Analytics routes
├── services/
│   ├── authService.js         # Authentication service
│   ├── branchService.js       # Branch management service
│   ├── menuService.js         # Menu management service
│   ├── orderService.js        # Order management service
│   ├── bookingService.js      # Booking management service
│   ├── tableService.js        # Table management service
│   ├── feedbackService.js     # Feedback management service
│   ├── refundService.js       # Refund management service
│   ├── settingService.js      # Settings management service
│   └── analyticsService.js    # Analytics service
├── middleware/
│   ├── authMiddleware.js      # Authentication middleware
│   ├── errorMiddleware.js     # Error handling middleware
│   └── validationMiddleware.js # Request validation middleware
├── utils/
│   ├── logger.js              # Logging utility
│   ├── responseHandler.js     # Response formatting utility
│   └── imageProcessor.js      # Image processing utility
├── .env                       # Environment variables
├── .env.example              # Example environment variables
├── index.js                  # Entry point
└── package.json              # Dependencies
```

## Authentication Implementation

### authRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');

// Register a new restaurant owner
router.post('/register', validateRegister, authController.register);

// Login for restaurant owner
router.post('/login', validateLogin, authController.login);

// Employee login
router.post('/employee/login', authController.employeeLogin);

module.exports = router;
```

### authController.js

```javascript
const authService = require('../services/authService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.register = async (req, res) => {
  try {
    const userData = req.body;
    const result = await authService.registerUser(userData);
    return successResponse(res, 'Registration successful', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    return successResponse(res, 'Login successful', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.employeeLogin = async (req, res) => {
  try {
    const { employeeId, password, branchId } = req.body;
    const result = await authService.loginEmployee(employeeId, password, branchId);
    return successResponse(res, 'Login successful', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Branches Implementation

### branchRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branchController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateBranch } = require('../middleware/validationMiddleware');

// Get all branches
router.get('/', authenticate, branchController.getAllBranches);

// Add a new branch
router.post('/', authenticate, validateBranch, branchController.addBranch);

// Update a branch
router.put('/:branchId', authenticate, validateBranch, branchController.updateBranch);

// Delete a branch
router.delete('/:branchId', authenticate, branchController.deleteBranch);

// Toggle branch online status
router.patch('/:branchId/toggle-online', authenticate, branchController.toggleBranchOnlineStatus);

module.exports = router;
```

### branchController.js

```javascript
const branchService = require('../services/branchService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllBranches = async (req, res) => {
  try {
    const userId = req.user.id;
    const branches = await branchService.getAllBranches(userId);
    return successResponse(res, null, branches);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.addBranch = async (req, res) => {
  try {
    const userId = req.user.id;
    const branchData = req.body;
    const result = await branchService.addBranch(userId, branchData);
    return successResponse(res, 'Branch added successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateBranch = async (req, res) => {
  try {
    const userId = req.user.id;
    const { branchId } = req.params;
    const branchData = req.body;
    const result = await branchService.updateBranch(userId, branchId, branchData);
    return successResponse(res, 'Branch updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.deleteBranch = async (req, res) => {
  try {
    const userId = req.user.id;
    const { branchId } = req.params;
    await branchService.deleteBranch(userId, branchId);
    return successResponse(res, 'Branch deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.toggleBranchOnlineStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { branchId } = req.params;
    const result = await branchService.toggleBranchOnlineStatus(userId, branchId);
    return successResponse(res, 'Branch online status updated', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Menu Implementation

### menuRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateMenuItem, validateCategory } = require('../middleware/validationMiddleware');

// Get menu items
router.get('/', authenticate, menuController.getMenuItems);

// Add menu item
router.post('/', authenticate, validateMenuItem, menuController.addMenuItem);

// Update menu item
router.put('/:itemId', authenticate, validateMenuItem, menuController.updateMenuItem);

// Delete menu item
router.delete('/:itemId', authenticate, menuController.deleteMenuItem);

// Toggle menu item availability
router.patch('/:itemId/toggle-availability', authenticate, menuController.toggleMenuItemAvailability);

// Add category
router.post('/categories', authenticate, validateCategory, menuController.addCategory);

module.exports = router;
```

### menuController.js

```javascript
const menuService = require('../services/menuService');
const { successResponse, errorResponse } = require('../utils/responseHandler');
const imageProcessor = require('../utils/imageProcessor');

exports.getMenuItems = async (req, res) => {
  try {
    const { branchId } = req.query;
    const result = await menuService.getMenuItems(branchId);
    return successResponse(res, null, result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.addMenuItem = async (req, res) => {
  try {
    const { branchId, image, ...itemData } = req.body;
    
    // Process image if provided
    let imageUrl = null;
    if (image) {
      imageUrl = await imageProcessor.uploadImage(image);
    }
    
    const result = await menuService.addMenuItem(branchId, { ...itemData, image: imageUrl });
    return successResponse(res, 'Menu item added successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { branchId, image, ...itemData } = req.body;
    
    // Process image if provided
    let imageUrl = null;
    if (image) {
      imageUrl = await imageProcessor.uploadImage(image);
      itemData.image = imageUrl;
    }
    
    const result = await menuService.updateMenuItem(branchId, itemId, itemData);
    return successResponse(res, 'Menu item updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.deleteMenuItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { branchId } = req.query;
    await menuService.deleteMenuItem(branchId, itemId);
    return successResponse(res, 'Menu item deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.toggleMenuItemAvailability = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { branchId } = req.query;
    const result = await menuService.toggleMenuItemAvailability(branchId, itemId);
    return successResponse(res, 'Menu item availability updated', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { branchId, name } = req.body;
    const result = await menuService.addCategory(branchId, name);
    return successResponse(res, 'Category added successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Orders Implementation

### orderRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateOrder, validateOrderStatus, validatePrepTime } = require('../middleware/validationMiddleware');

// Get all orders
router.get('/', authenticate, orderController.getAllOrders);

// Get order details
router.get('/:orderId', authenticate, orderController.getOrderDetails);

// Update order status
router.patch('/:orderId/status', authenticate, validateOrderStatus, orderController.updateOrderStatus);

// Update order prep time
router.patch('/:orderId/prep-time', authenticate, validatePrepTime, orderController.updateOrderPrepTime);

// Accept new order
router.post('/:orderId/accept', authenticate, validatePrepTime, orderController.acceptNewOrder);

// Create offline order
router.post('/', authenticate, validateOrder, orderController.createOfflineOrder);

// Get order history
router.get('/history', authenticate, orderController.getOrderHistory);

module.exports = router;
```

### orderController.js

```javascript
const orderService = require('../services/orderService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllOrders = async (req, res) => {
  try {
    const { branchId, status, type, date } = req.query;
    const orders = await orderService.getAllOrders(branchId, status, type, date);
    return successResponse(res, null, orders);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { branchId } = req.query;
    const order = await orderService.getOrderDetails(branchId, orderId);
    return successResponse(res, null, order);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { branchId, status } = req.body;
    const result = await orderService.updateOrderStatus(branchId, orderId, status);
    return successResponse(res, 'Order status updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateOrderPrepTime = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { branchId, extraMinutes } = req.body;
    const result = await orderService.updateOrderPrepTime(branchId, orderId, extraMinutes);
    return successResponse(res, 'Order prep time updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.acceptNewOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { branchId, prepTime } = req.body;
    const result = await orderService.acceptNewOrder(branchId, orderId, prepTime);
    return successResponse(res, 'Order accepted successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.createOfflineOrder = async (req, res) => {
  try {
    const { branchId, items, customerName, customerPhone, type, paymentMethod } = req.body;
    const result = await orderService.createOfflineOrder(branchId, items, customerName, customerPhone, type, paymentMethod);
    return successResponse(res, 'Order created successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.getOrderHistory = async (req, res) => {
  try {
    const { branchId, startDate, endDate, type } = req.query;
    const orders = await orderService.getOrderHistory(branchId, startDate, endDate, type);
    return successResponse(res, null, orders);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Bookings Implementation

### bookingRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateBooking, validateBookingStatus } = require('../middleware/validationMiddleware');

// Get all bookings
router.get('/', authenticate, bookingController.getAllBookings);

// Add booking
router.post('/', authenticate, validateBooking, bookingController.addBooking);

// Update booking status
router.patch('/:bookingId/status', authenticate, validateBookingStatus, bookingController.updateBookingStatus);

module.exports = router;
```

### bookingController.js

```javascript
const bookingService = require('../services/bookingService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllBookings = async (req, res) => {
  try {
    const { branchId, date, status } = req.query;
    const bookings = await bookingService.getAllBookings(branchId, date, status);
    return successResponse(res, null, bookings);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.addBooking = async (req, res) => {
  try {
    const { branchId, name, phone, date, time, partySize, tables, fee } = req.body;
    const result = await bookingService.addBooking(branchId, { name, phone, date, time, partySize, tables }, fee);
    return successResponse(res, 'Booking added successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { branchId, status } = req.body;
    const result = await bookingService.updateBookingStatus(branchId, bookingId, status);
    return successResponse(res, 'Booking status updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Tables Implementation

### tableRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateTable } = require('../middleware/validationMiddleware');

// Get all tables
router.get('/', authenticate, tableController.getAllTables);

// Add table
router.post('/', authenticate, validateTable, tableController.addTable);

// Update table
router.put('/:tableId', authenticate, validateTable, tableController.updateTable);

// Delete table
router.delete('/:tableId', authenticate, tableController.deleteTable);

module.exports = router;
```

### tableController.js

```javascript
const tableService = require('../services/tableService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllTables = async (req, res) => {
  try {
    const { branchId } = req.query;
    const tables = await tableService.getAllTables(branchId);
    return successResponse(res, null, tables);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.addTable = async (req, res) => {
  try {
    const { branchId, name, capacity } = req.body;
    const result = await tableService.addTable(branchId, name, capacity);
    return successResponse(res, 'Table added successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    const { branchId, name, capacity, status } = req.body;
    const result = await tableService.updateTable(branchId, tableId, { name, capacity, status });
    return successResponse(res, 'Table updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.deleteTable = async (req, res) => {
  try {
    const { tableId } = req.params;
    const { branchId } = req.query;
    await tableService.deleteTable(branchId, tableId);
    return successResponse(res, 'Table deleted successfully');
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Feedback Implementation

### feedbackRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateFeedbackReply } = require('../middleware/validationMiddleware');

// Get all feedback
router.get('/', authenticate, feedbackController.getAllFeedback);

// Add reply to feedback
router.post('/:feedbackId/reply', authenticate, validateFeedbackReply, feedbackController.addReplyToFeedback);

module.exports = router;
```

### feedbackController.js

```javascript
const feedbackService = require('../services/feedbackService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllFeedback = async (req, res) => {
  try {
    const { branchId } = req.query;
    const feedback = await feedbackService.getAllFeedback(branchId);
    return successResponse(res, null, feedback);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.addReplyToFeedback = async (req, res) => {
  try {
    const { feedbackId } = req.params;
    const { branchId, reply } = req.body;
    const result = await feedbackService.addReplyToFeedback(branchId, feedbackId, reply);
    return successResponse(res, 'Reply added successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Refunds Implementation

### refundRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const refundController = require('../controllers/refundController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateRefundStatus } = require('../middleware/validationMiddleware');

// Get all refund requests
router.get('/', authenticate, refundController.getAllRefundRequests);

// Handle refund request
router.patch('/:refundId/status', authenticate, validateRefundStatus, refundController.handleRefundRequest);

module.exports = router;
```

### refundController.js

```javascript
const refundService = require('../services/refundService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getAllRefundRequests = async (req, res) => {
  try {
    const { branchId, status } = req.query;
    const refunds = await refundService.getAllRefundRequests(branchId, status);
    return successResponse(res, null, refunds);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.handleRefundRequest = async (req, res) => {
  try {
    const { refundId } = req.params;
    const { branchId, status } = req.body;
    const result = await refundService.handleRefundRequest(branchId, refundId, status);
    return successResponse(res, `Refund request ${status.toLowerCase()} successfully`, result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Settings Implementation

### settingRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');
const { authenticate } = require('../middleware/authMiddleware');
const { validateServiceSetting, validateOwnerInfo, validateNotificationSetting, validateFacilities } = require('../middleware/validationMiddleware');

// Get restaurant settings
router.get('/', authenticate, settingController.getRestaurantSettings);

// Update service settings
router.patch('/services', authenticate, validateServiceSetting, settingController.updateServiceSettings);

// Update owner info
router.patch('/owner-info', authenticate, validateOwnerInfo, settingController.updateOwnerInfo);

// Update notification settings
router.patch('/notifications', authenticate, validateNotificationSetting, settingController.updateNotificationSettings);

// Update facilities
router.patch('/facilities', authenticate, validateFacilities, settingController.updateFacilities);

// Toggle restaurant online status
router.patch('/toggle-online', authenticate, settingController.toggleRestaurantOnlineStatus);

// Toggle restaurant busy status
router.patch('/toggle-busy', authenticate, settingController.toggleRestaurantBusyStatus);

module.exports = router;
```

### settingController.js

```javascript
const settingService = require('../services/settingService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getRestaurantSettings = async (req, res) => {
  try {
    const { branchId } = req.query;
    const settings = await settingService.getRestaurantSettings(branchId);
    return successResponse(res, null, settings);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateServiceSettings = async (req, res) => {
  try {
    const { branchId, setting, value } = req.body;
    const result = await settingService.updateServiceSettings(branchId, setting, value);
    return successResponse(res, 'Service settings updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateOwnerInfo = async (req, res) => {
  try {
    const { branchId, ownerInfo } = req.body;
    const result = await settingService.updateOwnerInfo(branchId, ownerInfo);
    return successResponse(res, 'Owner info updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateNotificationSettings = async (req, res) => {
  try {
    const { branchId, setting, value } = req.body;
    const result = await settingService.updateNotificationSettings(branchId, setting, value);
    return successResponse(res, 'Notification settings updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.updateFacilities = async (req, res) => {
  try {
    const { branchId, facilities } = req.body;
    const result = await settingService.updateFacilities(branchId, facilities);
    return successResponse(res, 'Facilities updated successfully', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.toggleRestaurantOnlineStatus = async (req, res) => {
  try {
    const { branchId, isOnline } = req.body;
    const result = await settingService.toggleRestaurantOnlineStatus(branchId, isOnline);
    return successResponse(res, 'Restaurant online status updated', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.toggleRestaurantBusyStatus = async (req, res) => {
  try {
    const { branchId, isBusy } = req.body;
    const result = await settingService.toggleRestaurantBusyStatus(branchId, isBusy);
    return successResponse(res, 'Restaurant busy status updated', result);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Analytics Implementation

### analyticsRoutes.js

```javascript
const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { authenticate } = require('../middleware/authMiddleware');

// Get dashboard analytics
router.get('/dashboard', authenticate, analyticsController.getDashboardAnalytics);

// Get earnings analytics
router.get('/earnings', authenticate, analyticsController.getEarningsAnalytics);

// Get order analytics
router.get('/orders', authenticate, analyticsController.getOrderAnalytics);

// Get customer analytics
router.get('/customers', authenticate, analyticsController.getCustomerAnalytics);

// Get feedback analytics
router.get('/feedback', authenticate, analyticsController.getFeedbackAnalytics);

module.exports = router;
```

### analyticsController.js

```javascript
const analyticsService = require('../services/analyticsService');
const { successResponse, errorResponse } = require('../utils/responseHandler');

exports.getDashboardAnalytics = async (req, res) => {
  try {
    const { branchId } = req.query;
    const analytics = await analyticsService.getDashboardAnalytics(branchId);
    return successResponse(res, null, analytics);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.getEarningsAnalytics = async (req, res) => {
  try {
    const { branchId, period } = req.query;
    const analytics = await analyticsService.getEarningsAnalytics(branchId, period);
    return successResponse(res, null, analytics);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.getOrderAnalytics = async (req, res) => {
  try {
    const { branchId, period } = req.query;
    const analytics = await analyticsService.getOrderAnalytics(branchId, period);
    return successResponse(res, null, analytics);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.getCustomerAnalytics = async (req, res) => {
  try {
    const { branchId, period } = req.query;
    const analytics = await analyticsService.getCustomerAnalytics(branchId, period);
    return successResponse(res, null, analytics);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};

exports.getFeedbackAnalytics = async (req, res) => {
  try {
    const { branchId, period } = req.query;
    const analytics = await analyticsService.getFeedbackAnalytics(branchId, period);
    return successResponse(res, null, analytics);
  } catch (error) {
    return errorResponse(res, error.message, error.statusCode);
  }
};
```

## Main Application Entry Point

### index.js

```javascript
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const branchRoutes = require('./routes/branchRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const tableRoutes = require('./routes/tableRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const refundRoutes = require('./routes/refundRoutes');
const settingRoutes = require('./routes/settingRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');

// Import middleware
const { errorHandler } = require('./middleware/errorMiddleware');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Routes
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

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
```

This implementation guide provides a comprehensive structure for building the backend API for the XCES Restaurant Management System. Each section includes the necessary routes, controllers, and basic implementation details to support the frontend requirements.