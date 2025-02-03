const request = require('supertest');
const app = require('../src/server');
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Item = require('../src/models/Item');
const Order = require('../src/models/Order');
const SupportSession = require('../src/models/SupportSession');

let authToken;
let testUserId;
let testItemId;
let testOrderId;
let testItem = {
  name: 'Test Item',
  description: 'Test Description',
  price: 99.99,
  sellerId: null
};

beforeAll(async () => {
  // Clear test database
  await User.deleteMany({});
  await Item.deleteMany({});
  await Order.deleteMany({});
  await SupportSession.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Authentication Endpoints', () => {
  const testUser = {
    email: 'test@iiit.ac.in',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    age: 20,
    contactNumber: 9876543210
  };

  test('POST /api/auth/register - register new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
    testUserId = res.body.user._id;
    testItem.sellerId = testUserId;
  });

  test('POST /api/auth/login - login user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
    authToken = res.body.token;
  });

  test('GET /api/auth/me - get current user', async () => {
    const res = await request(app)
      .get('/api/auth/me')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(testUser.email);
  });
});

describe('Item Endpoints', () => {

  test('POST /api/items - create item', async () => {
    const res = await request(app)
      .post('/api/items')
      .set('Authorization', `Bearer ${authToken}`)
      .send(testItem);
    expect(res.status).toBe(201);
    testItemId = res.body.item._id;
  });

  test('GET /api/items - get all items', async () => {
    const res = await request(app)
      .get('/api/items')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBeTruthy();
  });
});

describe('Cart Endpoints', () => {
  test('POST /api/cart - add item to cart', async () => {
    const res = await request(app)
      .post('/api/cart')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ itemId: testItemId, quantity: 1 });
    if (res.status === 500) {
      console.log(res.body);
    }
    expect(res.status).toBe(200);
  });

  test('GET /api/cart - get cart', async () => {
    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.cart)).toBeTruthy();
  });
});

describe('Order Endpoints', () => {
  test('POST /api/orders - place order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(201);
    testOrderId = res.body._id;
  });

  test('GET /api/orders - get order history', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${authToken}`)
      .query({ type: 'pending' });
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.orders)).toBeTruthy();
  });
});

describe('Delivery Endpoints', () => {
  test('GET /api/deliveries - get pending deliveries', async () => {
    const res = await request(app)
      .get('/api/deliveries')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.deliveries)).toBeTruthy();
  });
});

describe('Support Chat Endpoints', () => {
  test('GET /api/support/session - get chat session', async () => {
    const res = await request(app)
      .get('/api/support/session')
      .set('Authorization', `Bearer ${authToken}`);
    expect(res.status).toBe(200);
    expect(res.body.session).toHaveProperty('_id');
  });

  test('POST /api/support/message - send message', async () => {
    const res = await request(app)
      .post('/api/support/message')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ message: 'Test message' });
    expect(res.status).toBe(200);
  });
});