# Database Fetching Patterns and Indexing Strategy

This document outlines the common database query patterns identified from analyzing the controller and service layers, along with the corresponding indexing strategy to optimize these queries.

## 1. Restaurant Module Patterns

### Order Model (`orderModel.ts`)
- **Query Patterns:**
  - `find({ branchId, status, type, date })` - Dashboard and list views.
  - `findOne({ orderId, branchId })` - Specific order details and updates.
  - `find({ branchId, date: { $gte, $lte } })` - History and analytics.
- **Recommended Indexes:**
  - Compound: `{ branchId: 1, date: -1 }` (History/Analytics)
  - Compound: `{ branchId: 1, status: 1 }` (Status filtering)
  - Compound: `{ branchId: 1, orderId: 1 }` (Detail lookups)

### Menu Model (`menuSchema.ts`)
- **Query Patterns:**
  - `find({ restaurantId })` - Fetch all items with pagination.
  - `findOne({ restaurantId, itemId })` - Item details/updates.
  - `$text: { $search: query }` with `restaurantId` and `category` - Search functionality.
- **Recommended Indexes:**
  - Compound: `{ restaurantId: 1, category: 1 }` (Browsing)
  - Compound: `{ restaurantId: 1, available: 1 }` (Availability checks)
  - Text: `{ name: 'text', description: 'text' }` (Search)

### Feedback Model (`feedbackModel.ts`)
- **Query Patterns:**
  - `find({ branchId, date: { $gte, $lte } })` - List and analytics.
  - `findOne({ branchId, feedbackId })` - Details.
  - Aggregation: `{ $match: { branchId } }, { $group: { _id: "$rating" } }` - Analytics.
- **Recommended Indexes:**
  - Compound: `{ branchId: 1, date: -1 }` (Timeline)
  - Compound: `{ branchId: 1, rating: -1 }` (Rating analytics)

### TableBooking Model (`bookingModel.ts`)
- **Query Patterns:**
  - Aggregation: `{ $match: { restaurantId } }, { $group: { _id: "$status" } }` - Grouped list.
  - `findOne({ tableId, restaurantId })` - Status updates.
  - `find({ restaurantId, name: { $in: names } })` - Bulk existence check.
- **Recommended Indexes:**
  - Compound: `{ restaurantId: 1, status: 1 }` (Grouped views)
  - Compound: `{ restaurantId: 1, name: 1 }` (Uniqueness/Duplicate checks)

### Promotion & Offer Models
- **Query Patterns:**
  - `find({ restaurantId })` with pagination.
  - `findOne({ restaurantId, promotionId/offerId })`.
- **Recommended Indexes:**
  - Compound: `{ restaurantId: 1, promotionStatus/offerStatus: 1 }`
  - Compound: `{ restaurantId: 1, couponCode: 1 }` (Validation)

### Main Branch Model (`mainBranch.ts`)
- **Query Patterns:**
  - `find({ "contact.email": email })` - User's branch list.
  - `findOne({ branchId, "contact.email": email })` - Profile management.
- **Recommended Indexes:**
  - Single: `{ "contact.email": 1 }`
  - Unique: `{ branchId: 1 }`

## 2. Delivery Module Patterns

### Delivery Partner Model
- **Query Patterns:**
  - `findOne({ partnerId })` - Profile lookups.
  - `update({ partnerId })` - Status/Profile updates.
- **Recommended Indexes:**
  - Unique: `{ partnerId: 1 }`

### Delivery Order Patterns
- **Query Patterns:**
  - `find({ status: 'Ready' })` - Available orders for pickup.
  - `find({ partnerId, status: { $in: ['Picked Up', ...] } })` - Active partner orders.
