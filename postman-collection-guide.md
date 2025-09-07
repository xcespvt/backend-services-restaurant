# XCES Restaurant Management System API - Postman Collection Guide

This guide will help you set up and use the Postman collection for testing the XCES Restaurant Management System API.

## Importing the Collection

1. Open Postman
2. Click on "Import" in the top left corner
3. Select the `xces-restaurant-api.postman_collection.json` file
4. Click "Import"

## Setting Up Environment Variables

The collection uses several environment variables to make testing easier. Create a new environment in Postman with the following variables:

| Variable | Initial Value | Description |
|----------|---------------|-------------|
| `base_url` | `http://localhost:5000/api` | The base URL of your API |
| `token` | | Will be automatically set after login |
| `branch_id` | | Will be automatically set after getting branches |
| `owner_email` | `owner@example.com` | Email for owner login |
| `owner_password` | `password123` | Password for owner login |
| `employee_email` | `employee@example.com` | Email for employee login |
| `employee_password` | `password123` | Password for employee login |

## Authentication Flow

The collection includes scripts that automatically set the `token` variable after successful login. To authenticate:

1. First, use the "Register" endpoint if you need to create a new account
2. Then, use either "Owner Login" or "Employee Login" to get a token
3. The token will be automatically saved to your environment variables

## Testing Workflow

A typical testing workflow would be:

1. Authenticate using the login endpoints
2. Get all branches (this will automatically set the `branch_id` variable)
3. Test other endpoints as needed

## Request Body Reference

For detailed information about the request body parameters required for each endpoint, refer to the `postman-body-reference.md` file.

## Environment Setup

For detailed instructions on setting up your Postman environment, including pre-request scripts and test scripts, refer to the `postman-environment-setup.md` file.

## Collection Structure

The collection is organized into the following folders:

- **Authentication**: Register, Owner Login, Employee Login
- **Branches**: Get All, Add, Update, Delete, Toggle Online Status
- **Menu**: Get Items, Add Item, Update Item, Delete Item, Toggle Availability, Add Category
- **Orders**: Get All, Get Details, Update Status, Update Prep Time, Accept New, Create Offline, Get History
- **Bookings**: Get All, Add, Update Status
- **Tables**: Get All, Add, Update, Delete
- **Feedback**: Get All, Add Reply
- **Refunds**: Get All, Handle Request
- **Settings**: Get Settings, Update Services, Update Owner Info, Update Notifications, Update Facilities, Toggle Online/Busy Status
- **Analytics**: Dashboard, Earnings, Orders, Customers, Feedback

## File Upload

For endpoints that require file uploads (like adding a menu item with an image), you'll need to:

1. Use the "form-data" body type
2. Add a file field named "image"
3. Select a file from your computer

## Troubleshooting

- If you get authentication errors, make sure your token is valid
- If endpoints return 404 errors, check that your `base_url` is correct
- For branch-specific endpoints, ensure your `branch_id` is set correctly

## Best Practices

- Use the collection's environment variables to avoid hardcoding values
- Test endpoints in a logical order (e.g., create before update)
- Check response status codes and bodies to verify successful operations
- Use the pre-request and test scripts to automate your testing workflow