# XCES Restaurant Management System - Backend Services

## Overview

This repository contains the backend services for the XCES Restaurant Management System, a comprehensive solution for restaurant owners to manage their operations efficiently. The system provides APIs for managing branches, menus, orders, bookings, tables, feedback, refunds, and analytics.

## Features

- **Authentication**: User and employee authentication
- **Branch Management**: Create, update, and manage multiple restaurant branches
- **Menu Management**: Manage menu items and categories
- **Order Management**: Process online and offline orders
- **Booking Management**: Handle table reservations
- **Table Management**: Manage restaurant tables and their status
- **Feedback Management**: Collect and respond to customer feedback
- **Refund Management**: Process refund requests
- **Settings Management**: Configure restaurant settings
- **Analytics**: Get insights on orders, customers, and feedback

## Tech Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: ODM for MongoDB
- **JWT**: Authentication

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

To install dependencies:

```bash
npm install
# or
bun install
```

To run:

```bash
npm start
# or
bun run index.js
```

## API Documentation

### Authentication
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: User login
- `POST /api/auth/employee/login`: Employee login

### Branch Management
- `GET /api/branches`: Get all branches
- `POST /api/branches`: Add a new branch
- `PUT /api/branches/:branchId`: Update a branch
- `DELETE /api/branches/:branchId`: Delete a branch
- `PATCH /api/branches/:branchId/toggle-online`: Toggle branch online status

### Menu Management
- `GET /api/menu/:branchId`: Get all menu items for a branch
- `POST /api/menu/:branchId`: Add a new menu item
- `PUT /api/menu/:branchId/:itemId`: Update a menu item
- `DELETE /api/menu/:branchId/:itemId`: Delete a menu item
- `PATCH /api/menu/:branchId/:itemId/toggle-availability`: Toggle menu item availability
- `POST /api/menu/:branchId/category`: Add a new category

### Order Management
- `GET /api/orders/:branchId`: Get all orders for a branch
- `GET /api/orders/:branchId/:orderId`: Get order details
- `PATCH /api/orders/:branchId/:orderId/status`: Update order status
- `PATCH /api/orders/:branchId/:orderId/prep-time`: Update order preparation time
- `POST /api/orders/:branchId/accept`: Accept new order
- `POST /api/orders/:branchId/offline`: Create offline order
- `GET /api/orders/:branchId/history/:customerId`: Get order history

### Booking Management
- `GET /api/bookings/:branchId`: Get all bookings for a branch
- `POST /api/bookings/:branchId`: Add a new booking
- `PATCH /api/bookings/:branchId/:bookingId/status`: Update booking status

### Table Management
- `GET /api/tables/:branchId`: Get all tables for a branch
- `POST /api/tables/:branchId`: Add a new table
- `PUT /api/tables/:branchId/:tableId`: Update a table
- `DELETE /api/tables/:branchId/:tableId`: Delete a table
- `PATCH /api/tables/:branchId/:tableId/status`: Update table status

### Feedback Management
- `GET /api/feedback/:branchId`: Get all feedback for a branch
- `GET /api/feedback/:branchId/:feedbackId`: Get feedback details
- `POST /api/feedback/:branchId`: Add a new feedback
- `PATCH /api/feedback/:branchId/:feedbackId/reply`: Reply to feedback
- `GET /api/feedback/:branchId/analytics`: Get feedback analytics

### Refund Management
- `GET /api/refunds/:branchId`: Get all refunds for a branch
- `GET /api/refunds/:branchId/:refundId`: Get refund details
- `POST /api/refunds/:branchId`: Create a refund request
- `PATCH /api/refunds/:branchId/:refundId/status`: Update refund status
- `PATCH /api/refunds/:branchId/:refundId/cost-split`: Update cost split

### Settings Management
- `GET /api/settings/:branchId`: Get settings for a branch
- `PUT /api/settings/:branchId`: Update settings
- `PATCH /api/settings/:branchId/toggle-online`: Toggle online status
- `PATCH /api/settings/:branchId/toggle-busy`: Toggle busy status
- `PATCH /api/settings/:branchId/service`: Update service settings
- `PATCH /api/settings/:branchId/facilities`: Update facilities
- `PATCH /api/settings/:branchId/owner-info`: Update owner info
- `PATCH /api/settings/:branchId/notifications`: Update notification settings

### Analytics
- `GET /api/analytics/:branchId/orders`: Get order analytics for a branch
- `GET /api/analytics/:branchId/customers`: Get customer analytics for a branch
- `GET /api/analytics/:branchId/feedback`: Get feedback analytics for a branch
