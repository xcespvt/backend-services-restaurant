# Memory Leak and Pagination Audit Report

This report identifies potential memory leak risks due to large data fetching and provides recommendations for transitioning from offset-based to cursor-based pagination.

## 1. Memory Leak & Performance Risks

The following services and controllers perform "Full Collection Fetches" for a given branch without limits, which will lead to memory exhaustion as the data grows.

### High Risk: Analytics Service
- **`analyticsService.getOrderAnalytics`**: Fetches every single order document for a period (week/month/year) into memory to calculate totals and breakdowns.
- **`analyticsService.getCustomerAnalytics`**: Fetches all orders and builds a `Set` of unique customers in RAM.
- **`analyticsService.getFeedbackAnalytics`**: Fetches all feedback for a period to calculate average ratings in-memory.
- **Recommendation**: These should be refactored to use **MongoDB Aggregation Pipelines** (`$group`, `$sum`, `$avg`) to perform calculations on the database side rather than fetching all documents.

### Medium Risk: Data Listing Services
- **`orderService.getAllOrders`**: Fetches all orders for a branch without pagination.
- **`orderService.getOrderHistory`**: Fetches all orders in a date range without pagination.
- **`feedbackService.getAllFeedback`**: Fetches all feedback for a branch without pagination.
- **Recommendation**: Implement pagination for these endpoints immediately.

---

## 2. Pagination Strategy Analysis

### Current State: Offset-Based (Index-Based)
The following endpoints currently use `skip` and `limit`:
- `MenuController.getMenuItems`
- `OfferController.getOffers`
- `PromotionController.getPromotions`

**The Problem**: As `skip` increases (e.g., page 100), MongoDB must read and discard thousands of documents, leading to high CPU usage and slow response times.

### Recommendation: Transition to Cursor-Based Pagination
For high-volume collections, we should move to cursor-based pagination using the `_id` or `createdAt` fields.

#### Implementation Pattern:
Instead of `page` and `limit`, use `nextCursor` (the ID of the last item from the previous page).

**Example for Orders:**
```javascript
// Instead of:
// Order.find({ branchId }).skip(100).limit(10)

// Use:
// Order.find({ branchId, _id: { $gt: lastId } }).limit(10).sort({ _id: 1 })
```

#### Where to Apply Cursor-Based Pagination:
1. **Orders List**: This is the highest volume collection.
2. **Feedback List**: Grows indefinitely over time.
3. **Menu Items**: While smaller, cursor-based pagination is still best practice for consistency.

---

## 3. Immediate Action Items

1. **Aggregation Refactor**: Move in-memory calculations in `analyticsService` to database aggregations.
2. **Add Pagination to Orders**: Update `orderController.getAllOrders` to accept `limit` and `cursor`.
3. **Add Pagination to Feedback**: Update `feedbackController.getAllFeedback` to accept `limit` and `cursor`.
