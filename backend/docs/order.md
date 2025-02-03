# Order API Documentation

## Place Order
**POST** `/api/orders`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:** *(201 Created)*
```json
{
  "order": {
    "id": "string",
    "buyer": "string",
    "seller": "string",
    "items": [
      {
        "item": "string",
        "quantity": "number"
      }
    ],
    "total": "number",
    "status": "pending"
  },
  "otp": "string"
}
```

**Example:**
```json
// Response
{
  "order": {
    "id": "507f1f77bcf86cd799439011",
    "buyer": "507f1f77bcf86cd799439012",
    "seller": "507f1f77bcf86cd799439013",
    "items": [
      {
        "item": "507f1f77bcf86cd799439014",
        "quantity": 2
      }
    ],
    "total": 19.98,
    "status": "pending"
  },
  "otp": "123456"
}
```

## Get Order History
**GET** `/api/orders?type=[pending|bought|sold]`

**Headers:**
```json
Authorization: Bearer <token>
```

**Query Parameters:**
- 

type

 (optional): Filter orders by type
  - `pending`: Show pending orders
  - `bought`: Show orders where user is buyer
  - `sold`: Show orders where user is seller

**Response:** *(200 OK)*
```json
{
  "orders": [
    {
      "id": "string",
      "buyer": {
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      },
      "seller": {
        "firstName": "string",
        "lastName": "string",
        "email": "string"
      },
      "items": [
        {
          "item": {
            "id": "string",
            "name": "string",
            "price": "number"
          },
          "quantity": "number"
        }
      ],
      "total": "number",
      "status": "string"
    }
  ]
}
```

**Example:**
```json
// GET /api/orders?type=bought

// Response
{
  "orders": [
    {
      "id": "507f1f77bcf86cd799439011",
      "buyer": {
        "firstName": "John",
        "lastName": "Doe",
        "email": "john@example.com"
      },
      "seller": {
        "firstName": "Jane",
        "lastName": "Smith",
        "email": "jane@example.com"
      },
      "items": [
        {
          "item": {
            "id": "507f1f77bcf86cd799439014",
            "name": "Coffee Mug",
            "price": 9.99
          },
          "quantity": 2
        }
      ],
      "total": 19.98,
      "status": "pending"
    }
  ]
}
```

## Verify OTP
**POST** `/api/orders/verify`

**Headers:**
```json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "orderId": "string",
  "otp": "string"
}
```

**Response:** *(200 OK)*
```json
{
  "verified": "boolean"
}
```

**Example:**
```json
// Request
{
  "orderId": "507f1f77bcf86cd799439011",
  "otp": "123456"
}

// Response
{
  "verified": true
}
```

## Complete Order
**PUT** `/api/orders/:orderId/complete`

**Headers:**
```json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "otp": "string"
}
```

**Response:** *(200 OK)*
```json
{
  "order": {
    "id": "string",
    "status": "completed",
    // ... other order details
  }
}
```

**Example:**
```json
// PUT /api/orders/507f1f77bcf86cd799439011/complete

// Request
{
  "otp": "123456"
}

// Response
{
  "order": {
    "id": "507f1f77bcf86cd799439011",
    "status": "completed",
    "buyer": "507f1f77bcf86cd799439012",
    "seller": "507f1f77bcf86cd799439013",
    "total": 19.98
  }
}
```