# XCES Restaurant Management System API Documentation

This document outlines all the API endpoints required by the XCES Restaurant Management System frontend dashboard.

## Table of Contents

1. [Authentication](#authentication)
2. [Branches](#branches)
3. [Menu](#menu)
4. [Orders](#orders)
5. [Bookings](#bookings)
6. [Tables](#tables)
7. [Feedback](#feedback)
8. [Refunds](#refunds)
9. [Settings](#settings)
10. [Analytics](#analytics)

## Authentication

### Register

```
POST /api/auth/register
```

**Request Body:**

```json
{
  "name": "Restaurant Name",
  "email": "owner@example.com",
  "phone": "+919876543210",
  "password": "securepassword",
  "whatsapp": "+919876543210"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "userId": "user123",
    "token": "jwt-token"
  }
}
```

### Login

```
POST /api/auth/login
```

**Request Body:**

```json
{
  "email": "owner@example.com",
  "password": "securepassword"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "userId": "user123",
    "token": "jwt-token",
    "name": "Restaurant Name",
    "email": "owner@example.com",
    "phone": "+919876543210",
    "whatsapp": "+919876543210",
    "subscriptionPlan": "Free"
  }
}
```

### Employee Login

```
POST /api/auth/employee/login
```

**Request Body:**

```json
{
  "employeeId": "EMP001",
  "password": "employeepassword",
  "branchId": "indiranagar"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "employeeId": "EMP001",
    "token": "jwt-token",
    "name": "Employee Name",
    "role": "Manager",
    "branchId": "indiranagar"
  }
}
```

## Branches

### Get All Branches

```
GET /api/branches
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "indiranagar",
      "name": "Spice Garden - Indiranagar",
      "address": "123 100ft Road",
      "city": "Bangalore",
      "pincode": "560038",
      "manager": "Rahul Sharma",
      "managerPhone": "+91 98765 43210",
      "hours": "10:00 AM - 10:00 PM",
      "gst": "29ABCDE1234F1Z5",
      "fssai": "12345678901234",
      "ordersToday": 42,
      "status": "Active",
      "isOnline": true
    }
  ]
}
```

### Add Branch

```
POST /api/branches
```

**Request Body:**

```json
{
  "name": "Spice Garden - HSR Layout",
  "address": "789 27th Main",
  "city": "Bangalore",
  "pincode": "560102",
  "manager": "Amit Kumar",
  "managerPhone": "+91 98765 12345",
  "hours": "10:00 AM - 10:00 PM",
  "gst": "29PQRST6789U1Z3",
  "fssai": "98765432101234",
  "status": "Active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Branch added successfully",
  "data": {
    "id": "hsr-layout",
    "name": "Spice Garden - HSR Layout",
    "address": "789 27th Main",
    "city": "Bangalore",
    "pincode": "560102",
    "manager": "Amit Kumar",
    "managerPhone": "+91 98765 12345",
    "hours": "10:00 AM - 10:00 PM",
    "gst": "29PQRST6789U1Z3",
    "fssai": "98765432101234",
    "ordersToday": 0,
    "status": "Active",
    "isOnline": false
  }
}
```

### Update Branch

```
PUT /api/branches/:branchId
```

**Request Body:**

```json
{
  "name": "Spice Garden - HSR Layout",
  "address": "789 27th Main",
  "city": "Bangalore",
  "pincode": "560102",
  "manager": "Amit Kumar",
  "managerPhone": "+91 98765 12345",
  "hours": "10:00 AM - 11:00 PM",
  "gst": "29PQRST6789U1Z3",
  "fssai": "98765432101234",
  "status": "Active"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Branch updated successfully",
  "data": {
    "id": "hsr-layout",
    "name": "Spice Garden - HSR Layout",
    "address": "789 27th Main",
    "city": "Bangalore",
    "pincode": "560102",
    "manager": "Amit Kumar",
    "managerPhone": "+91 98765 12345",
    "hours": "10:00 AM - 11:00 PM",
    "gst": "29PQRST6789U1Z3",
    "fssai": "98765432101234",
    "ordersToday": 0,
    "status": "Active",
    "isOnline": false
  }
}
```

### Delete Branch

```
DELETE /api/branches/:branchId
```

**Response:**

```json
{
  "success": true,
  "message": "Branch deleted successfully"
}
```

### Toggle Branch Online Status

```
PATCH /api/branches/:branchId/toggle-online
```

**Response:**

```json
{
  "success": true,
  "message": "Branch online status updated",
  "data": {
    "id": "hsr-layout",
    "isOnline": true
  }
}
```

## Menu

### Get Menu Items

```
GET /api/menu?branchId=:branchId
```

**Response:**

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "name": "Margherita Pizza",
        "description": "Classic cheese pizza with tomato sauce",
        "price": 299,
        "category": "Pizza",
        "image": "https://example.com/images/margherita.jpg",
        "aiHint": "A classic Italian pizza with tomato sauce, mozzarella, and basil",
        "available": true,
        "dietaryType": "Veg",
        "portionOptions": [
          { "name": "Regular", "price": 299 },
          { "name": "Large", "price": 499 }
        ]
      }
    ],
    "categories": ["Pizza", "Pasta", "Desserts", "Beverages"]
  }
}
```

### Add Menu Item

```
POST /api/menu
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "name": "Pepperoni Pizza",
  "description": "Classic pepperoni pizza with extra cheese",
  "price": 349,
  "category": "Pizza",
  "image": "base64-encoded-image-data",
  "available": true,
  "dietaryType": "Non-Veg",
  "portionOptions": [
    { "name": "Regular", "price": 349 },
    { "name": "Large", "price": 549 }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Menu item added successfully",
  "data": {
    "id": 2,
    "name": "Pepperoni Pizza",
    "description": "Classic pepperoni pizza with extra cheese",
    "price": 349,
    "category": "Pizza",
    "image": "https://example.com/images/pepperoni.jpg",
    "aiHint": "A classic American-style pizza topped with pepperoni slices and cheese",
    "available": true,
    "dietaryType": "Non-Veg",
    "portionOptions": [
      { "name": "Regular", "price": 349 },
      { "name": "Large", "price": 549 }
    ]
  }
}
```

### Update Menu Item

```
PUT /api/menu/:itemId
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "name": "Pepperoni Pizza",
  "description": "Classic pepperoni pizza with extra cheese and oregano",
  "price": 369,
  "category": "Pizza",
  "image": "base64-encoded-image-data",
  "available": true,
  "dietaryType": "Non-Veg",
  "portionOptions": [
    { "name": "Regular", "price": 369 },
    { "name": "Large", "price": 569 }
  ]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Menu item updated successfully",
  "data": {
    "id": 2,
    "name": "Pepperoni Pizza",
    "description": "Classic pepperoni pizza with extra cheese and oregano",
    "price": 369,
    "category": "Pizza",
    "image": "https://example.com/images/pepperoni.jpg",
    "aiHint": "A classic American-style pizza topped with pepperoni slices and cheese",
    "available": true,
    "dietaryType": "Non-Veg",
    "portionOptions": [
      { "name": "Regular", "price": 369 },
      { "name": "Large", "price": 569 }
    ]
  }
}
```

### Delete Menu Item

```
DELETE /api/menu/:itemId?branchId=:branchId
```

**Response:**

```json
{
  "success": true,
  "message": "Menu item deleted successfully"
}
```

### Toggle Menu Item Availability

```
PATCH /api/menu/:itemId/toggle-availability?branchId=:branchId
```

**Response:**

```json
{
  "success": true,
  "message": "Menu item availability updated",
  "data": {
    "id": 2,
    "available": false
  }
}
```

### Add Category

```
POST /api/menu/categories
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "name": "Starters"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Category added successfully",
  "data": {
    "categories": ["Pizza", "Pasta", "Desserts", "Beverages", "Starters"]
  }
}
```

## Orders

### Get All Orders

```
GET /api/orders?branchId=:branchId&status=:status&type=:type&date=:date
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "ORD12345",
      "customer": "John Doe",
      "time": "7:30 PM",
      "date": "2023-06-15",
      "status": "Preparing",
      "type": "Delivery",
      "items": [
        {
          "id": 1,
          "name": "Margherita Pizza",
          "quantity": 2,
          "price": 299,
          "category": "Pizza"
        }
      ],
      "prepTime": "20 mins",
      "total": 598,
      "source": "Online",
      "customerDetails": {
        "name": "John Doe",
        "address": "123 Main St, Indiranagar, Bangalore",
        "phone": "+919876543210",
        "email": "john@example.com"
      },
      "payment": {
        "method": "Online",
        "status": "Paid"
      },
      "offer": {
        "code": "WELCOME20",
        "type": "Percentage"
      },
      "deliveryPartner": {
        "name": "Rahul",
        "avatar": "https://example.com/avatar.jpg",
        "avatarFallback": "RS",
        "rating": 4.5
      },
      "pickupOtp": "1234"
    }
  ]
}
```

### Get Order Details

```
GET /api/orders/:orderId?branchId=:branchId
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "ORD12345",
    "customer": "John Doe",
    "time": "7:30 PM",
    "date": "2023-06-15",
    "status": "Preparing",
    "type": "Delivery",
    "items": [
      {
        "id": 1,
        "name": "Margherita Pizza",
        "quantity": 2,
        "price": 299,
        "category": "Pizza"
      }
    ],
    "prepTime": "20 mins",
    "total": 598,
    "source": "Online",
    "customerDetails": {
      "name": "John Doe",
      "address": "123 Main St, Indiranagar, Bangalore",
      "phone": "+919876543210",
      "email": "john@example.com"
    },
    "payment": {
      "method": "Online",
      "status": "Paid"
    },
    "offer": {
      "code": "WELCOME20",
      "type": "Percentage"
    },
    "deliveryPartner": {
      "name": "Rahul",
      "avatar": "https://example.com/avatar.jpg",
      "avatarFallback": "RS",
      "rating": 4.5
    },
    "pickupOtp": "1234"
  }
}
```

### Update Order Status

```
PATCH /api/orders/:orderId/status
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "status": "Ready"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order status updated successfully",
  "data": {
    "id": "ORD12345",
    "status": "Ready"
  }
}
```

### Update Order Prep Time

```
PATCH /api/orders/:orderId/prep-time
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "extraMinutes": 10
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order prep time updated successfully",
  "data": {
    "id": "ORD12345",
    "prepTime": "30 mins"
  }
}
```

### Accept New Order

```
POST /api/orders/:orderId/accept
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "prepTime": "25 mins"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order accepted successfully",
  "data": {
    "id": "ORD12345",
    "status": "Preparing",
    "prepTime": "25 mins"
  }
}
```

### Create Offline Order

```
POST /api/orders
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "items": [
    {
      "id": 1,
      "name": "Margherita Pizza",
      "quantity": 2,
      "price": 299,
      "category": "Pizza"
    }
  ],
  "customerName": "Walk-in Customer",
  "customerPhone": "+919876543210",
  "type": "Takeaway",
  "paymentMethod": "Cash"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "ORD67890",
    "customer": "Walk-in Customer",
    "time": "8:45 PM",
    "date": "2023-06-15",
    "status": "New",
    "type": "Takeaway",
    "items": [
      {
        "id": 1,
        "name": "Margherita Pizza",
        "quantity": 2,
        "price": 299,
        "category": "Pizza"
      }
    ],
    "prepTime": "20 mins",
    "total": 598,
    "source": "Offline",
    "customerDetails": {
      "name": "Walk-in Customer",
      "address": "",
      "phone": "+919876543210",
      "email": ""
    },
    "payment": {
      "method": "Cash",
      "status": "Pending"
    }
  }
}
```

### Get Order History

```
GET /api/orders/history?branchId=:branchId&startDate=:startDate&endDate=:endDate&type=:type
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "ORD12345",
      "customer": "John Doe",
      "time": "7:30 PM",
      "date": "2023-06-15",
      "status": "Delivered",
      "type": "Delivery",
      "total": 598,
      "source": "Online",
      "payment": {
        "method": "Online",
        "status": "Paid"
      }
    }
  ]
}
```

## Bookings

### Get All Bookings

```
GET /api/bookings?branchId=:branchId&date=:date&status=:status
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "BKG12345",
      "name": "John Doe",
      "phone": "+919876543210",
      "date": "2023-06-20",
      "time": "7:00 PM",
      "partySize": 4,
      "status": "Confirmed",
      "tables": [
        { "id": "T1", "name": "T1", "capacity": 4, "status": "Available" }
      ]
    }
  ]
}
```

### Add Booking

```
POST /api/bookings
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "name": "Jane Smith",
  "phone": "+919876543211",
  "date": "2023-06-22",
  "time": "8:00 PM",
  "partySize": 6,
  "tables": [
    { "id": "T5", "name": "T5", "capacity": 6, "status": "Available" }
  ],
  "fee": 500
}
```

**Response:**

```json
{
  "success": true,
  "message": "Booking added successfully",
  "data": {
    "id": "BKG67890",
    "name": "Jane Smith",
    "phone": "+919876543211",
    "date": "2023-06-22",
    "time": "8:00 PM",
    "partySize": 6,
    "status": "Confirmed",
    "tables": [
      { "id": "T5", "name": "T5", "capacity": 6, "status": "Available" }
    ]
  }
}
```

### Update Booking Status

```
PATCH /api/bookings/:bookingId/status
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "status": "Cancelled"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Booking status updated successfully",
  "data": {
    "id": "BKG67890",
    "status": "Cancelled"
  }
}
```

## Tables

### Get All Tables

```
GET /api/tables?branchId=:branchId
```

**Response:**

```json
{
  "success": true,
  "data": [
    { "id": "T1", "name": "T1", "capacity": 4, "status": "Available" },
    { "id": "T2", "name": "T2", "capacity": 4, "status": "Occupied" }
  ]
}
```

### Add Table

```
POST /api/tables
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "name": "T9",
  "capacity": 2
}
```

**Response:**

```json
{
  "success": true,
  "message": "Table added successfully",
  "data": {
    "id": "T9",
    "name": "T9",
    "capacity": 2,
    "status": "Available"
  }
}
```

### Update Table

```
PUT /api/tables/:tableId
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "name": "T9",
  "capacity": 4,
  "status": "Available"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Table updated successfully",
  "data": {
    "id": "T9",
    "name": "T9",
    "capacity": 4,
    "status": "Available"
  }
}
```

### Delete Table

```
DELETE /api/tables/:tableId?branchId=:branchId
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

```
GET /api/feedback?branchId=:branchId
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "FDB12345",
      "customer": {
        "name": "John Doe",
        "avatar": "https://example.com/avatar.jpg",
        "fallback": "JD",
        "orderCount": 5
      },
      "orderType": "Delivery",
      "rating": 4,
      "comment": "Food was great but delivery was a bit late.",
      "date": "2023-06-15",
      "items": ["Margherita Pizza", "Garlic Bread"],
      "photos": [
        { "url": "https://example.com/photo1.jpg", "hint": "Pizza photo" }
      ],
      "replied": false,
      "reply": ""
    }
  ]
}
```

### Add Reply to Feedback

```
POST /api/feedback/:feedbackId/reply
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "reply": "Thank you for your feedback. We apologize for the delay and will work on improving our delivery times."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Reply added successfully",
  "data": {
    "id": "FDB12345",
    "replied": true,
    "reply": "Thank you for your feedback. We apologize for the delay and will work on improving our delivery times."
  }
}
```

## Refunds

### Get All Refund Requests

```
GET /api/refunds?branchId=:branchId&status=:status
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "REF12345",
      "orderId": "ORD12345",
      "customerName": "John Doe",
      "customerAvatar": "https://example.com/avatar.jpg",
      "customerFallback": "JD",
      "amount": 598,
      "reason": "Order was very late",
      "status": "Pending",
      "date": "2023-06-16",
      "items": [
        {
          "name": "Margherita Pizza",
          "image": "https://example.com/pizza.jpg",
          "aiHint": "A classic Italian pizza",
          "price": 299
        }
      ],
      "photos": [
        { "url": "https://example.com/issue.jpg", "hint": "Issue photo" }
      ],
      "orderType": "Delivery",
      "orderTime": "7:30 PM",
      "costSplit": {
        "restaurant": 538.2,
        "crevings": 59.8
      }
    }
  ]
}
```

### Handle Refund Request

```
PATCH /api/refunds/:refundId/status
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "status": "Approved"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Refund request approved successfully",
  "data": {
    "id": "REF12345",
    "status": "Approved"
  }
}
```

## Settings

### Get Restaurant Settings

```
GET /api/settings?branchId=:branchId
```

**Response:**

```json
{
  "success": true,
  "data": {
    "serviceSettings": {
      "delivery": true,
      "takeaway": true,
      "dineIn": true,
      "booking": true
    },
    "ownerInfo": {
      "name": "Restaurant Owner",
      "email": "owner@example.com",
      "phone": "+919876543210",
      "whatsapp": "+919876543210"
    },
    "notificationSettings": {
      "newOrders": true,
      "payouts": true,
      "promotions": true,
      "orderUpdates": true,
      "customerReviews": true,
      "systemUpdates": true
    },
    "facilities": ["Parking", "Outdoor Seating", "WiFi", "Air Conditioning"]
  }
}
```

### Update Service Settings

```
PATCH /api/settings/services
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "setting": "booking",
  "value": false
}
```

**Response:**

```json
{
  "success": true,
  "message": "Service settings updated successfully",
  "data": {
    "serviceSettings": {
      "delivery": true,
      "takeaway": true,
      "dineIn": true,
      "booking": false
    }
  }
}
```

### Update Owner Info

```
PATCH /api/settings/owner-info
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "ownerInfo": {
    "name": "Restaurant Owner",
    "email": "owner@example.com",
    "phone": "+919876543210",
    "whatsapp": "+919876543210"
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
      "name": "Restaurant Owner",
      "email": "owner@example.com",
      "phone": "+919876543210",
      "whatsapp": "+919876543210"
    }
  }
}
```

### Update Notification Settings

```
PATCH /api/settings/notifications
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "setting": "customerReviews",
  "value": false
}
```

**Response:**

```json
{
  "success": true,
  "message": "Notification settings updated successfully",
  "data": {
    "notificationSettings": {
      "newOrders": true,
      "payouts": true,
      "promotions": true,
      "orderUpdates": true,
      "customerReviews": false,
      "systemUpdates": true
    }
  }
}
```

### Update Facilities

```
PATCH /api/settings/facilities
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "facilities": ["Parking", "Outdoor Seating", "WiFi", "Air Conditioning", "Live Music"]
}
```

**Response:**

```json
{
  "success": true,
  "message": "Facilities updated successfully",
  "data": {
    "facilities": ["Parking", "Outdoor Seating", "WiFi", "Air Conditioning", "Live Music"]
  }
}
```

### Toggle Restaurant Online Status

```
PATCH /api/settings/toggle-online
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
  "isOnline": true
}
```

**Response:**

```json
{
  "success": true,
  "message": "Restaurant online status updated",
  "data": {
    "isOnline": true
  }
}
```

### Toggle Restaurant Busy Status

```
PATCH /api/settings/toggle-busy
```

**Request Body:**

```json
{
  "branchId": "indiranagar",
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

```
GET /api/analytics/dashboard?branchId=:branchId
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalOrders": 1234,
    "revenue": 45231.89,
    "activeNow": 573,
    "activeOrders": 12,
    "orderGrowth": 20.1,
    "revenueGrowth": 19.0,
    "activeGrowth": 201
  }
}
```

### Get Earnings Analytics

```
GET /api/analytics/earnings?branchId=:branchId&period=:period
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalEarnings": 45231.89,
    "growth": 19.0,
    "periodData": [
      { "date": "2023-06-01", "earnings": 1500.50 },
      { "date": "2023-06-02", "earnings": 1650.75 }
    ],
    "orderTypeBreakdown": [
      { "type": "Delivery", "percentage": 65, "amount": 29400.73 },
      { "type": "Takeaway", "percentage": 25, "amount": 11307.97 },
      { "type": "Dine-in", "percentage": 10, "amount": 4523.19 }
    ],
    "paymentMethodBreakdown": [
      { "method": "Online", "percentage": 80, "amount": 36185.51 },
      { "method": "Cash", "percentage": 20, "amount": 9046.38 }
    ]
  }
}
```

### Get Order Analytics

```
GET /api/analytics/orders?branchId=:branchId&period=:period
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalOrders": 1234,
    "growth": 20.1,
    "periodData": [
      { "date": "2023-06-01", "orders": 45 },
      { "date": "2023-06-02", "orders": 52 }
    ],
    "orderTypeBreakdown": [
      { "type": "Delivery", "percentage": 65, "count": 802 },
      { "type": "Takeaway", "percentage": 25, "count": 309 },
      { "type": "Dine-in", "percentage": 10, "count": 123 }
    ],
    "topSellingItems": [
      { "name": "Margherita Pizza", "count": 320 },
      { "name": "Pepperoni Pizza", "count": 280 },
      { "name": "Garlic Bread", "count": 210 }
    ]
  }
}
```

### Get Customer Analytics

```
GET /api/analytics/customers?branchId=:branchId&period=:period
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalCustomers": 850,
    "newCustomers": 120,
    "returningCustomers": 730,
    "growth": 15.3,
    "periodData": [
      { "date": "2023-06-01", "newCustomers": 12, "returningCustomers": 33 },
      { "date": "2023-06-02", "newCustomers": 15, "returningCustomers": 37 }
    ],
    "topCustomers": [
      { 
        "name": "John Doe", 
        "orderCount": 12, 
        "totalSpent": 5600.50,
        "avatar": "https://example.com/avatar.jpg",
        "avatarFallback": "JD"
      }
    ]
  }
}
```

### Get Feedback Analytics

```
GET /api/analytics/feedback?branchId=:branchId&period=:period
```

**Response:**

```json
{
  "success": true,
  "data": {
    "averageRating": 4.2,
    "totalFeedbacks": 320,
    "ratingBreakdown": [
      { "rating": 5, "count": 150, "percentage": 46.9 },
      { "rating": 4, "count": 100, "percentage": 31.3 },
      { "rating": 3, "count": 50, "percentage": 15.6 },
      { "rating": 2, "count": 15, "percentage": 4.7 },
      { "rating": 1, "count": 5, "percentage": 1.5 }
    ],
    "periodData": [
      { "date": "2023-06-01", "averageRating": 4.1, "count": 10 },
      { "date": "2023-06-02", "averageRating": 4.3, "count": 12 }
    ]
  }
}
```