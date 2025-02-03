# Cart API Documentation

## Get Cart
**GET** `/api/cart`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:** *(200 OK)*
```json
{
  "cart": [
    {
      "item": {
        "id": "string",
        "name": "string",
        "price": "number",
        // ... other item details
      },
      "quantity": "number"
    }
  ]
}
```

**Example:**
```json
// Response
{
  "cart": [
    {
      "item": {
        "id": "507f1f77bcf86cd799439011",
        "name": "Coffee Mug",
        "price": 9.99
      },
      "quantity": 2
    }
  ]
}
```

## Add Item to Cart
**POST** `/api/cart`

**Headers:**
```json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "itemId": "string",
  "quantity": "number" // optional, defaults to 1
}
```

**Response:** *(200 OK)*
```json
{
  "cart": [
    {
      "item": "string",
      "quantity": "number"
    }
  ]
}
```

**Example:**
```json
// Request
{
  "itemId": "507f1f77bcf86cd799439011",
  "quantity": 2
}

// Response
{
  "cart": [
    {
      "item": "507f1f77bcf86cd799439011",
      "quantity": 2
    }
  ]
}
```

## Remove Item from Cart
**DELETE** `/api/cart/:itemId`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:** *(200 OK)*
```json
{
  "cart": [
    {
      "item": "string",
      "quantity": "number"
    }
  ]
}
```

**Example:**
```json
// DELETE /api/cart/507f1f77bcf86cd799439011

// Response
{
  "cart": [] // Empty array if it was the only item
}
```

## Clear Cart
**DELETE** `/api/cart`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:** *(200 OK)*
```json
{
  "cart": []
}
```

**Example:**
```json
// Response
{
  "cart": []
}
```