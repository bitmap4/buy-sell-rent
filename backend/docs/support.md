# Support API Documentation

## Get Support Session
**GET** `/api/support/session`

**Headers:**
```json
Authorization: Bearer <token>
```

**Response:** *(200 OK)*
```json
{
  "session": {
    "id": "string",
    "user": "string",
    "messages": [
      {
        "role": "string",
        "text": "string"
      }
    ]
  }
}
```

**Example:**
```json
// Response
{
  "session": {
    "id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "messages": [
      {
        "role": "user",
        "text": "Hello, I need help"
      },
      {
        "role": "assistant",
        "text": "Hello! How can I assist you today?"
      }
    ]
  }
}
```

## Send Message
**POST** `/api/support/message`

**Headers:**
```json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "message": "string",
  "sessionId": "string" // optional
}
```

**Response:** *(200 OK)*
```json
{
  "response": "string",
  "session": {
    "id": "string",
    "user": "string",
    "messages": [
      {
        "role": "string",
        "text": "string"
      }
    ]
  }
}
```

**Example:**
```json
// Request
{
  "message": "I need help with my order",
  "sessionId": "507f1f77bcf86cd799439011"
}

// Response
{
  "response": "Hello from the support chatbot!",
  "session": {
    "id": "507f1f77bcf86cd799439011",
    "user": "507f1f77bcf86cd799439012",
    "messages": [
      {
        "role": "user",
        "text": "I need help with my order"
      },
      {
        "role": "assistant",
        "text": "Hello from the support chatbot!"
      }
    ]
  }
}
```