## API Documentation

1. [Auth](./docs/user.md)
2. [Cart](./docs/cart.md)
3. [Delivery](./docs/delivery.md)
4. [Order](./docs/order.md)
5. [Support](./docs/support.md)
6. [Item](./docs/item.md)

## File Structure

```
/backend
│
├── src/
│   │
│   ├─/config
│   │   └── db.js                # Database connection configuration
│   ├── /controllers             # Route controllers
│   ├── /models                  # Mongoose models
│   ├── /routes                  # API route definitions
│   └── /middleware
│       └── authMiddleware.js    # Authentication middleware
│
├── /tests
│   └── api.test.js          # API tests
│
├── .env
├── .gitignore
├── package.json
└── server.js                # Main server file
```