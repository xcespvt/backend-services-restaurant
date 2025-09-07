# XCES Restaurant Management System API - Request Body Reference

This document provides a quick reference for the request body parameters required for each API endpoint in the XCES Restaurant Management System.

## Authentication

### Register
**POST /auth/register**
```json
{
  "name": "Restaurant Name",
  "email": "owner@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St, City, Country"
}
```

### Owner Login
**POST /auth/login**
```json
{
  "email": "owner@example.com",
  "password": "password123"
}
```

### Employee Login
**POST /auth/employee/login**
```json
{
  "email": "employee@example.com",
  "password": "password123",
  "branchId": "branch_id"
}
```

## Branches

### Add Branch
**POST /branches**
```json
{
  "name": "New Branch",
  "address": "789 Side St, City",
  "phone": "5556667777",
  "openingHours": {
    "monday": { "open": "09:00", "close": "22:00" },
    "tuesday": { "open": "09:00", "close": "22:00" },
    "wednesday": { "open": "09:00", "close": "22:00" },
    "thursday": { "open": "09:00", "close": "22:00" },
    "friday": { "open": "09:00", "close": "23:00" },
    "saturday": { "open": "10:00", "close": "23:00" },
    "sunday": { "open": "10:00", "close": "22:00" }
  }
}
```

### Update Branch
**PUT /branches/:branchId**
```json
{
  "name": "Updated Branch Name",
  "address": "Updated Address",
  "phone": "9998887777",
  "openingHours": {
    "monday": { "open": "08:00", "close": "21:00" },
    "tuesday": { "open": "08:00", "close": "21:00" },
    "wednesday": { "open": "08:00", "close": "21:00" },
    "thursday": { "open": "08:00", "close": "21:00" },
    "friday": { "open": "08:00", "close": "22:00" },
    "saturday": { "open": "09:00", "close": "22:00" },
    "sunday": { "open": "09:00", "close": "21:00" }
  }
}
```

### Toggle Branch Online Status
**PATCH /branches/:branchId/toggle-online**
```json
{
  "isOnline": false
}
```

## Menu Items

### Add Menu Item
**POST /menu/items** (multipart/form-data)
```
branchId: branch_id
name: New Dish
description: Description of the new dish
price: 14.99
categoryId: category_id
preparationTime: 20
image: [file upload]
```

### Update Menu Item
**PUT /menu/items/:itemId** (multipart/form-data)
```
branchId: branch_id
name: Updated Dish Name
description: Updated description
price: 16.99
categoryId: category_id
preparationTime: 25
image: [file upload] (optional)
```

### Toggle Menu Item Availability
**PATCH /menu/items/:itemId/toggle-availability**
```json
{
  "branchId": "branch_id",
  "isAvailable": false
}
```

### Add Menu Category
**POST /menu/categories**
```json
{
  "branchId": "branch_id",
  "name": "New Category"
}
```

## Orders

### Update Order Status
**PATCH /orders/:orderId/status**
```json
{
  "branchId": "branch_id",
  "status": "preparing"
}
```

### Update Order Preparation Time
**PATCH /orders/:orderId/prep-time**
```json
{
  "branchId": "branch_id",
  "extraMinutes": 15
}
```

### Accept New Order
**POST /orders/:orderId/accept**
```json
{
  "branchId": "branch_id",
  "prepTime": 30
}
```

### Create Offline Order
**POST /orders/offline**
```json
{
  "branchId": "branch_id",
  "items": [
    {
      "id": "item_id_1",
      "quantity": 2,
      "specialInstructions": "Extra cheese"
    },
    {
      "id": "item_id_2",
      "quantity": 1,
      "specialInstructions": "Dressing on the side"
    }
  ],
  "customerName": "Walk-in Customer",
  "customerPhone": "1234567890",
  "type": "dine-in",
  "paymentMethod": "cash"
}
```

## Bookings

### Add Booking
**POST /bookings**
```json
{
  "branchId": "branch_id",
  "name": "New Booking",
  "phone": "5556667777",
  "date": "2023-06-25",
  "time": "18:30",
  "partySize": 6,
  "tables": ["table_id_4", "table_id_5"],
  "fee": 20.00
}
```

### Update Booking Status
**PATCH /bookings/:bookingId/status**
```json
{
  "branchId": "branch_id",
  "status": "completed"
}
```

## Tables

### Add Table
**POST /tables**
```json
{
  "branchId": "branch_id",
  "name": "Table 4",
  "capacity": 8
}
```

### Update Table
**PUT /tables/:tableId**
```json
{
  "branchId": "branch_id",
  "name": "Updated Table Name",
  "capacity": 10,
  "status": "available"
}
```

## Feedback

### Add Reply to Feedback
**POST /feedback/:feedbackId/reply**
```json
{
  "branchId": "branch_id",
  "reply": "Thank you for your feedback. We apologize for the delay and will work to improve our delivery times."
}
```

## Refunds

### Handle Refund Request
**PATCH /refunds/:refundId/status**
```json
{
  "branchId": "branch_id",
  "status": "approved"
}
```

## Settings

### Update Service Settings
**PATCH /settings/services**
```json
{
  "branchId": "branch_id",
  "setting": "delivery.fee",
  "value": 6.00
}
```

### Update Owner Info
**PATCH /settings/owner-info**
```json
{
  "branchId": "branch_id",
  "ownerInfo": {
    "name": "Updated Owner Name",
    "email": "updated@example.com",
    "phone": "9876543210"
  }
}
```

### Update Notification Settings
**PATCH /settings/notifications**
```json
{
  "branchId": "branch_id",
  "setting": "push",
  "value": true
}
```

### Update Facilities
**PATCH /settings/facilities**
```json
{
  "branchId": "branch_id",
  "facilities": ["Parking", "Outdoor Seating", "Wheelchair Accessible", "WiFi", "Live Music"]
}
```

### Toggle Restaurant Online Status
**PATCH /settings/toggle-online**
```json
{
  "branchId": "branch_id",
  "isOnline": false
}
```

### Toggle Restaurant Busy Status
**PATCH /settings/toggle-busy**
```json
{
  "branchId": "branch_id",
  "isBusy": true
}
```

## Query Parameters Reference

### Get All Branches
**GET /branches**
- No query parameters required

### Get Menu Items
**GET /menu/items**
- `branchId`: Branch ID (required)
- `categoryId`: Category ID (optional)

### Get All Orders
**GET /orders**
- `branchId`: Branch ID (required)
- `status`: Order status (optional - pending, preparing, ready, completed, cancelled)

### Get Order Details
**GET /orders/:orderId**
- `branchId`: Branch ID (required)

### Get Order History
**GET /orders/history**
- `branchId`: Branch ID (required)
- `startDate`: Start date in YYYY-MM-DD format (optional)
- `endDate`: End date in YYYY-MM-DD format (optional)
- `type`: Order type (optional - delivery, pickup, dine-in)

### Get All Bookings
**GET /bookings**
- `branchId`: Branch ID (required)
- `date`: Date in YYYY-MM-DD format (optional)
- `status`: Booking status (optional - pending, confirmed, completed, cancelled)

### Get All Tables
**GET /tables**
- `branchId`: Branch ID (required)

### Get All Feedback
**GET /feedback**
- `branchId`: Branch ID (required)

### Get All Refund Requests
**GET /refunds**
- `branchId`: Branch ID (required)
- `status`: Refund status (optional - pending, approved, rejected)

### Get Restaurant Settings
**GET /settings**
- `branchId`: Branch ID (required)

### Get Dashboard Analytics
**GET /analytics/dashboard**
- `branchId`: Branch ID (required)

### Get Earnings Analytics
**GET /analytics/earnings**
- `branchId`: Branch ID (required)
- `period`: Time period (required - daily, weekly, monthly, yearly)

### Get Order Analytics
**GET /analytics/orders**
- `branchId`: Branch ID (required)
- `period`: Time period (required - daily, weekly, monthly, yearly)

### Get Customer Analytics
**GET /analytics/customers**
- `branchId`: Branch ID (required)
- `period`: Time period (required - daily, weekly, monthly, yearly)

### Get Feedback Analytics
**GET /analytics/feedback**
- `branchId`: Branch ID (required)
- `period`: Time period (required - daily, weekly, monthly, yearly)