# XCES Restaurant Management System API - Postman Collection

This document provides a comprehensive guide for testing the XCES Restaurant Management System API using Postman. Each endpoint is documented with its URL, method, required headers, request body, and example responses.

## Base URL

```
http://localhost:5000/api
```

## Authentication

### Register

**Endpoint:** `POST /auth/register`

**Request Body:**
```json
{
  "name": "Restaurant Name",
  "email": "owner@example.com",
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St, City, Country"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": "user_id",
    "name": "Restaurant Name",
    "email": "owner@example.com",
    "role": "owner",
    "token": "jwt_token"
  }
}
```

### Owner Login

**Endpoint:** `POST /auth/login`

**Request Body:**
```json
{
  "email": "owner@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "user_id",
    "name": "Restaurant Name",
    "email": "owner@example.com",
    "role": "owner",
    "token": "jwt_token"
  }
}
```

### Employee Login

**Endpoint:** `POST /auth/employee/login`

**Request Body:**
```json
{
  "email": "employee@example.com",
  "password": "password123",
  "branchId": "branch_id"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": "employee_id",
    "name": "Employee Name",
    "email": "employee@example.com",
    "role": "manager",
    "branchId": "branch_id",
    "token": "jwt_token"
  }
}
```

## Branches

### Get All Branches

**Endpoint:** `GET /branches`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "branch_id_1",
      "name": "Downtown Branch",
      "address": "123 Main St, City",
      "phone": "1234567890",
      "isOnline": true,
      "openingHours": {
        "monday": { "open": "09:00", "close": "22:00" },
        "tuesday": { "open": "09:00", "close": "22:00" },
        "wednesday": { "open": "09:00", "close": "22:00" },
        "thursday": { "open": "09:00", "close": "22:00" },
        "friday": { "open": "09:00", "close": "23:00" },
        "saturday": { "open": "10:00", "close": "23:00" },
        "sunday": { "open": "10:00", "close": "22:00" }
      }
    },
    {
      "id": "branch_id_2",
      "name": "Uptown Branch",
      "address": "456 High St, City",
      "phone": "0987654321",
      "isOnline": false,
      "openingHours": {
        "monday": { "open": "10:00", "close": "21:00" },
        "tuesday": { "open": "10:00", "close": "21:00" },
        "wednesday": { "open": "10:00", "close": "21:00" },
        "thursday": { "open": "10:00", "close": "21:00" },
        "friday": { "open": "10:00", "close": "22:00" },
        "saturday": { "open": "11:00", "close": "22:00" },
        "sunday": { "open": "11:00", "close": "21:00" }
      }
    }
  ]
}
```

### Add Branch

**Endpoint:** `POST /branches`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
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

**Response:**
```json
{
  "success": true,
  "message": "Branch added successfully",
  "data": {
    "id": "new_branch_id",
    "name": "New Branch",
    "address": "789 Side St, City",
    "phone": "5556667777",
    "isOnline": true,
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
}
```

### Update Branch

**Endpoint:** `PUT /branches/:branchId`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
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

**Response:**
```json
{
  "success": true,
  "message": "Branch updated successfully",
  "data": {
    "id": "branch_id",
    "name": "Updated Branch Name",
    "address": "Updated Address",
    "phone": "9998887777",
    "isOnline": true,
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
}
```

### Delete Branch

**Endpoint:** `DELETE /branches/:branchId`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Response:**
```json
{
  "success": true,
  "message": "Branch deleted successfully"
}
```

### Toggle Branch Online Status

**Endpoint:** `PATCH /branches/:branchId/toggle-online`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "isOnline": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Branch online status updated successfully",
  "data": {
    "id": "branch_id",
    "isOnline": false
  }
}
```

## Menu Items

### Get Menu Items

**Endpoint:** `GET /menu/items`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
categoryId=category_id (optional)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "item_id_1",
      "name": "Margherita Pizza",
      "description": "Classic pizza with tomato sauce, mozzarella, and basil",
      "price": 12.99,
      "image": "image_url",
      "categoryId": "category_id",
      "categoryName": "Pizza",
      "isAvailable": true,
      "preparationTime": 15
    },
    {
      "id": "item_id_2",
      "name": "Caesar Salad",
      "description": "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
      "price": 8.99,
      "image": "image_url",
      "categoryId": "category_id_2",
      "categoryName": "Salads",
      "isAvailable": true,
      "preparationTime": 10
    }
  ]
}
```

### Add Menu Item

**Endpoint:** `POST /menu/items`

**Headers:**
```
Authorization: Bearer jwt_token
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
branchId: branch_id
name: New Dish
description: Description of the new dish
price: 14.99
categoryId: category_id
preparationTime: 20
image: [file upload]
```

**Response:**
```json
{
  "success": true,
  "message": "Menu item added successfully",
  "data": {
    "id": "new_item_id",
    "name": "New Dish",
    "description": "Description of the new dish",
    "price": 14.99,
    "image": "image_url",
    "categoryId": "category_id",
    "categoryName": "Category Name",
    "isAvailable": true,
    "preparationTime": 20
  }
}
```

### Update Menu Item

**Endpoint:** `PUT /menu/items/:itemId`

**Headers:**
```
Authorization: Bearer jwt_token
Content-Type: multipart/form-data
```

**Request Body (Form Data):**
```
branchId: branch_id
name: Updated Dish Name
description: Updated description
price: 16.99
categoryId: category_id
preparationTime: 25
image: [file upload] (optional)
```

**Response:**
```json
{
  "success": true,
  "message": "Menu item updated successfully",
  "data": {
    "id": "item_id",
    "name": "Updated Dish Name",
    "description": "Updated description",
    "price": 16.99,
    "image": "image_url",
    "categoryId": "category_id",
    "categoryName": "Category Name",
    "isAvailable": true,
    "preparationTime": 25
  }
}
```

### Delete Menu Item

**Endpoint:** `DELETE /menu/items/:itemId`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
```

**Response:**
```json
{
  "success": true,
  "message": "Menu item deleted successfully"
}
```

### Toggle Menu Item Availability

**Endpoint:** `PATCH /menu/items/:itemId/toggle-availability`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "isAvailable": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Menu item availability updated successfully",
  "data": {
    "id": "item_id",
    "isAvailable": false
  }
}
```

### Add Menu Category

**Endpoint:** `POST /menu/categories`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "name": "New Category"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Category added successfully",
  "data": {
    "id": "new_category_id",
    "name": "New Category"
  }
}
```

## Orders

### Get All Orders

**Endpoint:** `GET /orders`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
status=pending (optional - pending, preparing, ready, completed, cancelled)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "order_id_1",
      "orderNumber": "ORD-001",
      "customerName": "John Doe",
      "customerPhone": "1234567890",
      "items": [
        {
          "id": "item_id_1",
          "name": "Margherita Pizza",
          "quantity": 2,
          "price": 12.99,
          "total": 25.98
        },
        {
          "id": "item_id_2",
          "name": "Caesar Salad",
          "quantity": 1,
          "price": 8.99,
          "total": 8.99
        }
      ],
      "total": 34.97,
      "status": "pending",
      "type": "delivery",
      "paymentMethod": "card",
      "paymentStatus": "paid",
      "createdAt": "2023-06-15T10:30:00Z",
      "estimatedReadyTime": "2023-06-15T11:00:00Z"
    },
    {
      "id": "order_id_2",
      "orderNumber": "ORD-002",
      "customerName": "Jane Smith",
      "customerPhone": "0987654321",
      "items": [
        {
          "id": "item_id_3",
          "name": "Chicken Burger",
          "quantity": 1,
          "price": 10.99,
          "total": 10.99
        }
      ],
      "total": 10.99,
      "status": "preparing",
      "type": "pickup",
      "paymentMethod": "cash",
      "paymentStatus": "pending",
      "createdAt": "2023-06-15T10:45:00Z",
      "estimatedReadyTime": "2023-06-15T11:15:00Z"
    }
  ]
}
```

### Get Order Details

**Endpoint:** `GET /orders/:orderId`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "order_id",
    "orderNumber": "ORD-001",
    "customerName": "John Doe",
    "customerPhone": "1234567890",
    "customerEmail": "john@example.com",
    "customerAddress": {
      "street": "123 Main St",
      "city": "Anytown",
      "state": "State",
      "zipCode": "12345"
    },
    "items": [
      {
        "id": "item_id_1",
        "name": "Margherita Pizza",
        "quantity": 2,
        "price": 12.99,
        "total": 25.98,
        "specialInstructions": "Extra cheese"
      },
      {
        "id": "item_id_2",
        "name": "Caesar Salad",
        "quantity": 1,
        "price": 8.99,
        "total": 8.99,
        "specialInstructions": "Dressing on the side"
      }
    ],
    "subtotal": 34.97,
    "tax": 3.50,
    "deliveryFee": 5.00,
    "tip": 4.00,
    "total": 47.47,
    "status": "pending",
    "type": "delivery",
    "paymentMethod": "card",
    "paymentStatus": "paid",
    "createdAt": "2023-06-15T10:30:00Z",
    "estimatedReadyTime": "2023-06-15T11:00:00Z",
    "specialInstructions": "Please ring the doorbell"
  }
}
```

### Update Order Status

**Endpoint:** `PATCH /orders/:orderId/status`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "status": "preparing"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "id": "order_id",
    "status": "preparing",
    "updatedAt": "2023-06-15T10:45:00Z"
  }
}
```

### Update Order Preparation Time

**Endpoint:** `PATCH /orders/:orderId/prep-time`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "extraMinutes": 15
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order prep time updated successfully",
  "data": {
    "id": "order_id",
    "estimatedReadyTime": "2023-06-15T11:15:00Z"
  }
}
```

### Accept New Order

**Endpoint:** `POST /orders/:orderId/accept`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "prepTime": 30
}
```

**Response:**
```json
{
  "success": true,
  "message": "Order accepted successfully",
  "data": {
    "id": "order_id",
    "status": "preparing",
    "estimatedReadyTime": "2023-06-15T11:00:00Z"
  }
}
```

### Create Offline Order

**Endpoint:** `POST /orders/offline`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
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

**Response:**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "new_order_id",
    "orderNumber": "ORD-003",
    "customerName": "Walk-in Customer",
    "customerPhone": "1234567890",
    "items": [
      {
        "id": "item_id_1",
        "name": "Margherita Pizza",
        "quantity": 2,
        "price": 12.99,
        "total": 25.98,
        "specialInstructions": "Extra cheese"
      },
      {
        "id": "item_id_2",
        "name": "Caesar Salad",
        "quantity": 1,
        "price": 8.99,
        "total": 8.99,
        "specialInstructions": "Dressing on the side"
      }
    ],
    "subtotal": 34.97,
    "tax": 3.50,
    "total": 38.47,
    "status": "preparing",
    "type": "dine-in",
    "paymentMethod": "cash",
    "paymentStatus": "paid",
    "createdAt": "2023-06-15T11:30:00Z",
    "estimatedReadyTime": "2023-06-15T12:00:00Z"
  }
}
```

### Get Order History

**Endpoint:** `GET /orders/history`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
startDate=2023-06-01 (optional)
endDate=2023-06-15 (optional)
type=delivery (optional - delivery, pickup, dine-in)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "order_id_1",
      "orderNumber": "ORD-001",
      "customerName": "John Doe",
      "total": 47.47,
      "status": "completed",
      "type": "delivery",
      "paymentMethod": "card",
      "paymentStatus": "paid",
      "createdAt": "2023-06-15T10:30:00Z",
      "completedAt": "2023-06-15T11:30:00Z"
    },
    {
      "id": "order_id_2",
      "orderNumber": "ORD-002",
      "customerName": "Jane Smith",
      "total": 10.99,
      "status": "completed",
      "type": "pickup",
      "paymentMethod": "cash",
      "paymentStatus": "paid",
      "createdAt": "2023-06-15T10:45:00Z",
      "completedAt": "2023-06-15T11:15:00Z"
    }
  ]
}
```

## Bookings

### Get All Bookings

**Endpoint:** `GET /bookings`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
date=2023-06-20 (optional)
status=confirmed (optional - pending, confirmed, completed, cancelled)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "booking_id_1",
      "name": "John Doe",
      "phone": "1234567890",
      "date": "2023-06-20",
      "time": "19:00",
      "partySize": 4,
      "tables": ["table_id_1", "table_id_2"],
      "status": "confirmed",
      "createdAt": "2023-06-15T10:30:00Z"
    },
    {
      "id": "booking_id_2",
      "name": "Jane Smith",
      "phone": "0987654321",
      "date": "2023-06-20",
      "time": "20:00",
      "partySize": 2,
      "tables": ["table_id_3"],
      "status": "pending",
      "createdAt": "2023-06-15T11:00:00Z"
    }
  ]
}
```

### Add Booking

**Endpoint:** `POST /bookings`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
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

**Response:**
```json
{
  "success": true,
  "message": "Booking added successfully",
  "data": {
    "id": "new_booking_id",
    "name": "New Booking",
    "phone": "5556667777",
    "date": "2023-06-25",
    "time": "18:30",
    "partySize": 6,
    "tables": ["table_id_4", "table_id_5"],
    "status": "confirmed",
    "fee": 20.00,
    "createdAt": "2023-06-15T12:00:00Z"
  }
}
```

### Update Booking Status

**Endpoint:** `PATCH /bookings/:bookingId/status`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "status": "completed"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "id": "booking_id",
    "status": "completed",
    "updatedAt": "2023-06-15T12:30:00Z"
  }
}
```

## Tables

### Get All Tables

**Endpoint:** `GET /tables`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "table_id_1",
      "name": "Table 1",
      "capacity": 4,
      "status": "available"
    },
    {
      "id": "table_id_2",
      "name": "Table 2",
      "capacity": 2,
      "status": "occupied"
    },
    {
      "id": "table_id_3",
      "name": "Table 3",
      "capacity": 6,
      "status": "reserved"
    }
  ]
}
```

### Add Table

**Endpoint:** `POST /tables`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "name": "Table 4",
  "capacity": 8
}
```

**Response:**
```json
{
  "success": true,
  "message": "Table added successfully",
  "data": {
    "id": "new_table_id",
    "name": "Table 4",
    "capacity": 8,
    "status": "available"
  }
}
```

### Update Table

**Endpoint:** `PUT /tables/:tableId`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "name": "Updated Table Name",
  "capacity": 10,
  "status": "available"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Table updated successfully",
  "data": {
    "id": "table_id",
    "name": "Updated Table Name",
    "capacity": 10,
    "status": "available"
  }
}
```

### Delete Table

**Endpoint:** `DELETE /tables/:tableId`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
```

**Response:**
```json
{
  "success": true,
  "message": "Table deleted successfully"
}
```

## Feedback

### Get All Feedback

**Endpoint:** `GET /feedback`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "feedback_id_1",
      "orderId": "order_id_1",
      "customerName": "John Doe",
      "rating": 4,
      "comment": "Great food and service!",
      "reply": "Thank you for your feedback!",
      "createdAt": "2023-06-15T14:00:00Z"
    },
    {
      "id": "feedback_id_2",
      "orderId": "order_id_2",
      "customerName": "Jane Smith",
      "rating": 3,
      "comment": "Food was good but delivery was late.",
      "reply": null,
      "createdAt": "2023-06-15T15:00:00Z"
    }
  ]
}
```

### Add Reply to Feedback

**Endpoint:** `POST /feedback/:feedbackId/reply`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "reply": "Thank you for your feedback. We apologize for the delay and will work to improve our delivery times."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Reply added successfully",
  "data": {
    "id": "feedback_id",
    "reply": "Thank you for your feedback. We apologize for the delay and will work to improve our delivery times.",
    "updatedAt": "2023-06-15T16:00:00Z"
  }
}
```

## Refunds

### Get All Refund Requests

**Endpoint:** `GET /refunds`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
status=pending (optional - pending, approved, rejected)
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "refund_id_1",
      "orderId": "order_id_1",
      "orderNumber": "ORD-001",
      "customerName": "John Doe",
      "amount": 47.47,
      "reason": "Order was incorrect",
      "status": "pending",
      "createdAt": "2023-06-15T17:00:00Z"
    },
    {
      "id": "refund_id_2",
      "orderId": "order_id_2",
      "orderNumber": "ORD-002",
      "customerName": "Jane Smith",
      "amount": 10.99,
      "reason": "Food quality issue",
      "status": "approved",
      "createdAt": "2023-06-15T17:30:00Z",
      "processedAt": "2023-06-15T18:00:00Z"
    }
  ]
}
```

### Handle Refund Request

**Endpoint:** `PATCH /refunds/:refundId/status`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "status": "approved"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Refund request approved successfully",
  "data": {
    "id": "refund_id",
    "status": "approved",
    "processedAt": "2023-06-15T18:30:00Z"
  }
}
```

## Settings

### Get Restaurant Settings

**Endpoint:** `GET /settings`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "services": {
      "delivery": {
        "enabled": true,
        "fee": 5.00,
        "minOrderAmount": 15.00,
        "radius": 10
      },
      "pickup": {
        "enabled": true,
        "minOrderAmount": 10.00
      },
      "dineIn": {
        "enabled": true,
        "reservationEnabled": true,
        "reservationFee": 20.00
      }
    },
    "ownerInfo": {
      "name": "Restaurant Owner",
      "email": "owner@example.com",
      "phone": "1234567890"
    },
    "notifications": {
      "email": true,
      "sms": true,
      "push": false
    },
    "facilities": [
      "Parking",
      "Outdoor Seating",
      "Wheelchair Accessible",
      "WiFi"
    ],
    "isOnline": true,
    "isBusy": false
  }
}
```

### Update Service Settings

**Endpoint:** `PATCH /settings/services`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "setting": "delivery.fee",
  "value": 6.00
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service settings updated successfully",
  "data": {
    "services": {
      "delivery": {
        "fee": 6.00
      }
    }
  }
}
```

### Update Owner Info

**Endpoint:** `PATCH /settings/owner-info`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
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

**Response:**
```json
{
  "success": true,
  "message": "Owner info updated successfully",
  "data": {
    "ownerInfo": {
      "name": "Updated Owner Name",
      "email": "updated@example.com",
      "phone": "9876543210"
    }
  }
}
```

### Update Notification Settings

**Endpoint:** `PATCH /settings/notifications`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "setting": "push",
  "value": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Notification settings updated successfully",
  "data": {
    "notifications": {
      "push": true
    }
  }
}
```

### Update Facilities

**Endpoint:** `PATCH /settings/facilities`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "facilities": ["Parking", "Outdoor Seating", "Wheelchair Accessible", "WiFi", "Live Music"]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Facilities updated successfully",
  "data": {
    "facilities": ["Parking", "Outdoor Seating", "Wheelchair Accessible", "WiFi", "Live Music"]
  }
}
```

### Toggle Restaurant Online Status

**Endpoint:** `PATCH /settings/toggle-online`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "isOnline": false
}
```

**Response:**
```json
{
  "success": true,
  "message": "Restaurant online status updated",
  "data": {
    "isOnline": false
  }
}
```

### Toggle Restaurant Busy Status

**Endpoint:** `PATCH /settings/toggle-busy`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Request Body:**
```json
{
  "branchId": "branch_id",
  "isBusy": true
}
```

**Response:**
```json
{
  "success": true,
  "message": "Restaurant busy status updated",
  "data": {
    "isBusy": true
  }
}
```

## Analytics

### Get Dashboard Analytics

**Endpoint:** `GET /analytics/dashboard`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "totalSales": 4500.00,
    "averageOrderValue": 30.00,
    "pendingOrders": 5,
    "preparingOrders": 3,
    "readyOrders": 2,
    "topSellingItems": [
      {
        "id": "item_id_1",
        "name": "Margherita Pizza",
        "quantity": 45,
        "total": 584.55
      },
      {
        "id": "item_id_3",
        "name": "Chicken Burger",
        "quantity": 38,
        "total": 417.62
      },
      {
        "id": "item_id_2",
        "name": "Caesar Salad",
        "quantity": 30,
        "total": 269.70
      }
    ],
    "recentOrders": [
      {
        "id": "order_id_1",
        "orderNumber": "ORD-001",
        "customerName": "John Doe",
        "total": 47.47,
        "status": "completed",
        "createdAt": "2023-06-15T10:30:00Z"
      },
      {
        "id": "order_id_2",
        "orderNumber": "ORD-002",
        "customerName": "Jane Smith",
        "total": 10.99,
        "status": "completed",
        "createdAt": "2023-06-15T10:45:00Z"
      }
    ]
  }
}
```

### Get Earnings Analytics

**Endpoint:** `GET /analytics/earnings`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
period=weekly (daily, weekly, monthly, yearly)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalSales": 4500.00,
    "netSales": 4050.00,
    "refunds": 450.00,
    "averageOrderValue": 30.00,
    "salesByDay": [
      {
        "date": "2023-06-09",
        "sales": 600.00
      },
      {
        "date": "2023-06-10",
        "sales": 750.00
      },
      {
        "date": "2023-06-11",
        "sales": 500.00
      },
      {
        "date": "2023-06-12",
        "sales": 650.00
      },
      {
        "date": "2023-06-13",
        "sales": 700.00
      },
      {
        "date": "2023-06-14",
        "sales": 800.00
      },
      {
        "date": "2023-06-15",
        "sales": 500.00
      }
    ],
    "salesByOrderType": {
      "delivery": 2000.00,
      "pickup": 1500.00,
      "dineIn": 1000.00
    },
    "salesByPaymentMethod": {
      "card": 3000.00,
      "cash": 1500.00
    }
  }
}
```

### Get Order Analytics

**Endpoint:** `GET /analytics/orders`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
period=weekly (daily, weekly, monthly, yearly)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 150,
    "ordersByStatus": {
      "completed": 130,
      "cancelled": 20
    },
    "ordersByType": {
      "delivery": 70,
      "pickup": 50,
      "dineIn": 30
    },
    "ordersByDay": [
      {
        "date": "2023-06-09",
        "orders": 20
      },
      {
        "date": "2023-06-10",
        "orders": 25
      },
      {
        "date": "2023-06-11",
        "orders": 18
      },
      {
        "date": "2023-06-12",
        "orders": 22
      },
      {
        "date": "2023-06-13",
        "orders": 23
      },
      {
        "date": "2023-06-14",
        "orders": 27
      },
      {
        "date": "2023-06-15",
        "orders": 15
      }
    ],
    "averagePreparationTime": 25,
    "peakHours": [
      {
        "hour": "12:00",
        "orders": 30
      },
      {
        "hour": "18:00",
        "orders": 40
      },
      {
        "hour": "19:00",
        "orders": 35
      }
    ]
  }
}
```

### Get Customer Analytics

**Endpoint:** `GET /analytics/customers`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
period=monthly (daily, weekly, monthly, yearly)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCustomers": 100,
    "newCustomers": 20,
    "returningCustomers": 80,
    "customersByOrderFrequency": {
      "1-2": 50,
      "3-5": 30,
      "6+": 20
    },
    "topCustomers": [
      {
        "name": "John Doe",
        "orders": 12,
        "totalSpent": 360.00
      },
      {
        "name": "Jane Smith",
        "orders": 10,
        "totalSpent": 300.00
      },
      {
        "name": "Bob Johnson",
        "orders": 8,
        "totalSpent": 240.00
      }
    ],
    "customerRetentionRate": 80
  }
}
```

### Get Feedback Analytics

**Endpoint:** `GET /analytics/feedback`

**Headers:**
```
Authorization: Bearer jwt_token
```

**Query Parameters:**
```
branchId=branch_id
period=monthly (daily, weekly, monthly, yearly)
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalFeedback": 80,
    "averageRating": 4.2,
    "ratingDistribution": {
      "1": 2,
      "2": 5,
      "3": 10,
      "4": 30,
      "5": 33
    },
    "ratingByDay": [
      {
        "date": "2023-05-15",
        "rating": 4.0
      },
      {
        "date": "2023-05-22",
        "rating": 4.1
      },
      {
        "date": "2023-05-29",
        "rating": 4.3
      },
      {
        "date": "2023-06-05",
        "rating": 4.2
      },
      {
        "date": "2023-06-12",
        "rating": 4.4
      }
    ],
    "commonKeywords": [
      {
        "word": "delicious",
        "count": 30
      },
      {
        "word": "fast",
        "count": 25
      },
      {
        "word": "friendly",
        "count": 20
      },
      {
        "word": "late",
        "count": 10
      },
      {
        "word": "cold",
        "count": 5
      }
    ]
  }
}
```

This Postman collection document provides a comprehensive guide for testing all the API endpoints of the XCES Restaurant Management System. Each endpoint is documented with its URL, method, required headers, request body, and example responses to facilitate easy testing and integration.