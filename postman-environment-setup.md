# XCES Restaurant Management System - Postman Environment Setup

This document provides instructions for setting up your Postman environment to test the XCES Restaurant Management System API.

## Environment Variables

Create a new environment in Postman and add the following variables:

| Variable Name | Initial Value | Description |
|---------------|---------------|-------------|
| `base_url` | `http://localhost:5000/api` | Base URL for the API |
| `token` | (empty) | JWT token received after login |
| `branch_id` | (empty) | ID of the branch you're working with |
| `owner_email` | `owner@example.com` | Email for owner login |
| `owner_password` | `password123` | Password for owner login |
| `employee_email` | `employee@example.com` | Email for employee login |
| `employee_password` | `password123` | Password for employee login |

## Setting Up Authentication

1. Create a "Login" request:
   - Method: POST
   - URL: `{{base_url}}/auth/login`
   - Body (JSON):
     ```json
     {
       "email": "{{owner_email}}",
       "password": "{{owner_password}}"
     }
     ```
   - Tests (to automatically set the token):
     ```javascript
     if (pm.response.code === 200) {
         var jsonData = pm.response.json();
         if (jsonData.success && jsonData.data && jsonData.data.token) {
             pm.environment.set("token", jsonData.data.token);
             console.log("Token saved to environment");
         }
     }
     ```

2. Create an "Employee Login" request:
   - Method: POST
   - URL: `{{base_url}}/auth/employee/login`
   - Body (JSON):
     ```json
     {
       "email": "{{employee_email}}",
       "password": "{{employee_password}}",
       "branchId": "{{branch_id}}"
     }
     ```
   - Tests (to automatically set the token):
     ```javascript
     if (pm.response.code === 200) {
         var jsonData = pm.response.json();
         if (jsonData.success && jsonData.data && jsonData.data.token) {
             pm.environment.set("token", jsonData.data.token);
             console.log("Token saved to environment");
         }
     }
     ```

## Setting Up Branch ID

1. Create a "Get All Branches" request:
   - Method: GET
   - URL: `{{base_url}}/branches`
   - Headers:
     - Authorization: `Bearer {{token}}`
   - Tests (to automatically set the first branch ID):
     ```javascript
     if (pm.response.code === 200) {
         var jsonData = pm.response.json();
         if (jsonData.success && jsonData.data && jsonData.data.length > 0) {
             pm.environment.set("branch_id", jsonData.data[0].id);
             console.log("Branch ID saved to environment: " + jsonData.data[0].id);
         }
     }
     ```

## Using the Environment Variables

After setting up the environment, you can use these variables in all your requests:

1. For URLs:
   ```
   {{base_url}}/orders
   ```

2. For Headers:
   ```
   Authorization: Bearer {{token}}
   ```

3. For Request Bodies:
   ```json
   {
     "branchId": "{{branch_id}}",
     "name": "New Table",
     "capacity": 4
   }
   ```

## Workflow for Testing

1. Run the "Login" request to authenticate and set the token.
2. Run the "Get All Branches" request to set the branch ID.
3. Now you can run any other API requests using the token and branch ID.

## Pre-request Scripts for File Uploads

For endpoints that require file uploads (like adding or updating menu items), you can use this pre-request script to dynamically create a test image:

```javascript
// Create a simple test image (1x1 pixel transparent PNG)
const base64Image = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const binaryImage = Buffer.from(base64Image, 'base64');

// Create a Blob from the binary data
const blob = new Blob([binaryImage], { type: 'image/png' });

// Create a File object from the Blob
const testFile = new File([blob], 'test-image.png', { type: 'image/png' });

// Store the file in a variable that can be accessed in the request body
pm.variables.set("testFile", testFile);
```

Then in your form-data body, you can reference `{{testFile}}` for the image field.

## Troubleshooting

1. **Token Expired**: If you get a 401 Unauthorized error, your token may have expired. Run the Login request again to get a new token.

2. **Invalid Branch ID**: If you get errors related to the branch ID, make sure you've run the "Get All Branches" request and that it returned at least one branch.

3. **File Upload Issues**: For file uploads, you may need to manually select a file in Postman rather than using the pre-request script approach, depending on your Postman version.

4. **CORS Issues**: If testing against a local development server, you might encounter CORS issues. Make sure your backend has CORS properly configured.

## Additional Tips

1. Create folders in Postman to organize your requests by resource (Authentication, Branches, Menu Items, Orders, etc.).

2. Use Postman's collection runner to run a sequence of requests for testing workflows.

3. Save example responses for each request to document the expected output.

4. Use Postman's visualization feature to create charts or tables from API responses, especially useful for analytics endpoints.