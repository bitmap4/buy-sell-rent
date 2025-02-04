# Item API Documentation

## Get All Items
**GET** `/api/items`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:** *(200 OK)*
```json
{
  "items": [
    {
      "id": "string",
      "name": "string",
      "price": "number",
      "description": "string",
      "images": ["string"],
      "tags": ["string"],
      "sellerId": "string",
    }
  ]
}
```

**Example:**
```json
// Response
{
  "items": [
    {
      "id": "507f1f77bcf86cd799439011",
      "name": "Coffee Mug",
      "price": 9.99,
      "description": "A ceramic coffee mug",
      "images": ["https://example.com/image.jpg"],
      "tags": ["coffee", "mug"],
      "sellerId": "507f1f77bcf86cd799439012"
    }
  ]
}
```

## Create Item
**POST** `/api/items`

**Headers:**
```json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "price": "number",
  "description": "string",
  "images": ["string"],
  "tags": ["string"],
  "sellerId": "string",
}
```

**Response:** *(201 Created)*
```json
{
  "item": {
    "id": "string",
    "name": "string",
    "price": "number",
    "description": "string",
    "images": ["string"],
    "tags": ["string"],
    "sellerId": "string",
  }
}
```

**Example:**
```json
// Request
{
  "name": "Coffee Mug",
  "price": 9.99,
  "description": "A ceramic coffee mug",
  "images": ["https://example.com/image.jpg"],
  "tags": ["coffee", "mug"],
  "sellerId": "507f1f77bcf86cd799439012"
}

// Response
{
  "item": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Coffee Mug",
    "price": 9.99,
    "description": "A ceramic coffee mug",
    "images": ["https://example.com/image.jpg"],
    "tags": ["coffee", "mug"],
    "sellerId": "507f1f77bcf86cd799439012"
  }
}
```

## Get Item by ID
**GET** `/api/items/:id`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:** *(200 OK)*
```json
{
  "item": {
    "id": "string",
    "name": "string",
    "price": "number",
    "description": "string",
    "images": ["string"],
    "tags": ["string"],
    "sellerId": "string",
  }
}
```

**Example:**
```json
// GET /api/items/507f1f77bcf86cd799439011

// Response
{
  "item": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Coffee Mug",
    "price": 9.99,
    "description": "A ceramic coffee mug",
    "images": ["https://example.com/image.jpg"],
    "tags": ["coffee", "mug"],
    "sellerId": "507f1f77bcf86cd799439012"
  }
}
```

## Update Item
**PUT** `/api/items/:id`

**Headers:**
```json
Authorization: Bearer <token>
```

**Request Body:** *(all fields optional)*
```json
{
  "name": "string",
  "price": "number",
  "description": "string",
  "images": ["string"],
  "tags": ["string"],
  "sellerId": "string",
}
```

**Response:** *(200 OK)*
```json
{
  "item": {
    "id": "string",
    "name": "string",
    "price": "number",
    "description": "string",
    "images": ["string"],
    "tags": ["string"],
    "sellerId": "string",
  }
}
```

**Example:**
```json
// PUT /api/items/507f1f77bcf86cd799439011
// Request
{
  "price": 12.99,
  "description": "A premium ceramic coffee mug"
}

// Response
{
  "item": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Coffee Mug",
    "price": 12.99,
    "description": "A premium ceramic coffee mug",
    "images": ["https://example.com/image.jpg"],
    "tags": ["coffee", "mug"],
    "sellerId": "507f1f77bcf86cd799439012"
  }
}
```

## Delete Item
**DELETE** `/api/items/:id`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:** *(200 OK)*
```json
{
  "message": "Item removed"
}
```

**Example:**
```json
// DELETE /api/items/507f1f77bcf86cd799439011

// Response
{
  "message": "Item removed"
}
```