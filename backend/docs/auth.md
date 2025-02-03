# Authentication API

## Register User
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "age": "number",
  "contactNumber": "string",
  "password": "string"
}
```

**Response:** *(201 Created)*
```json
{
  "token": "string",
  "user": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "age": "number",
    "contactNumber": "string"
  }
}
```

**Example:**
```json
// Request
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "age": 25,
  "contactNumber": "1234567890",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 25,
    "contactNumber": "1234567890"
  }
}
```

## Login User
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:** *(200 OK)*
```json
{
  "token": "string",
  "user": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "age": "number",
    "contactNumber": "string"
  }
}
```

**Example:**
```json
// Request
{
  "email": "john@example.com",
  "password": "password123"
}

// Response
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 25,
    "contactNumber": "1234567890"
  }
}
```

## Get Current User
**GET** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Response:** *(200 OK)*
```json
{
  "user": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "age": "number",
    "contactNumber": "string"
  }
}
```

**Example:**
```json
// Response
{
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 25,
    "contactNumber": "1234567890"
  }
}
```

## Update Current User
**PUT** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:** *(all fields optional)*
```json
{
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "age": "number",
  "contactNumber": "string",
  "password": "string"
}
```

**Response:** *(200 OK)*
```json
{
  "user": {
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "age": "number",
    "contactNumber": "string"
  }
}
```

**Example:**
```json
// Request
{
  "firstName": "Johnny",
  "age": 26
}

// Response
{
  "user": {
    "firstName": "Johnny",
    "lastName": "Doe",
    "email": "john@example.com",
    "age": 26,
    "contactNumber": "1234567890"
  }
}
```