# 📄 API Document (PRD v1.1)

## Overview

- **Framework:** Next.js (with Hono API routes)
- **Authentication:** [Better Auth](https://www.better-auth.com/) (email + password, Bearer Token in headers)
- **Error Handling:** Standard JSON with `HTTPException`

  ```json
  { "error": "message" }
  ```

---

## 🔐 Authentication

### Token Handling

On successful **sign-in** or **sign-up**, Better Auth will return the token in the **response headers** under:

```http
set-auth-token: <bearer_token>
```

All subsequent API requests to protected routes must include:

```http
Authorization: Bearer <token>
```

---

### Sign Up Endpoint

- **POST** `/api/auth/sign-up/email`

- **Body:**

```json
{
  "name": "string",
  "email": "hello@example.com",
  "password": "string",
  "image": "https://example.com",
  "callbackURL": "/home",
  "rememberMe": true
}
```

- **Response (headers):**

```http
set-auth-token: <bearer_token>
```

- **Response (body):**

```json
{
  "user": {
    "id": "string",
    "email": "hello@example.com",
    "name": "string",
    "image": "https://example.com",
    "emailVerified": true,
    "createdAt": "2025-09-13T16:09:09.405Z",
    "updatedAt": "2025-09-13T16:09:09.405Z"
  }
}
```

---

### Sign In Endpoint

- **POST** `/api/auth/sign-in/email`

- **Body:**

```json
{
  "email": "user@example.com",
  "password": "password123",
  "rememberMe": true
}
```

- **Response (headers):**

```http
set-auth-token: <bearer_token>
```

- **Response (body):**

```json
{
  "redirect": false,
  "user": {
    "id": "1sb6D8lcZO64A9PtoVXSRmtDZZuKCUqW",
    "email": "keleb@gmail.com",
    "name": "John",
    "image": "",
    "emailVerified": false,
    "createdAt": "2025-09-13T16:37:38.259Z",
    "updatedAt": "2025-09-13T16:37:40.435Z"
  }
}
```

---

## 📝 Notes API

> **All endpoints require Bearer Token header**
>
> ```http
> Authorization: Bearer <token>
> ```

### Create Note

- **Endpoint:** `POST /api/note/create`
- **Body:**

```json
{
  "title": "string",
  "content": "string"
}
```

- **Response:**

```json
{
  "success": true,
  "data": {
    "id": "note123",
    "title": "string",
    "content": "string",
    "userId": "user123",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

---

### Update Note

- **Endpoint:** `PATCH /api/note/update/:id`
- **Body (partial):**

```json
{
  "title": "string?",
  "content": "string?"
}
```

- **Response:**

```json
{
  "success": true,
  "data": { "id": "note123", "title": "new title", "content": "new content" }
}
```

---

### Delete Note

- **Endpoint:** `DELETE /api/note/delete/:id`
- **Response:**

```json
{ "success": true, "message": "Note deleted" }
```

---

### Get All Notes

- **Endpoint:** `GET /api/note/all?page=1&limit=20`
- **Response:**

```json
{
  "success": true,
  "data": [{ "id": "note123", "title": "string", "content": "string" }],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

---

### Get Note by ID

- **Endpoint:** `GET /api/note/:id`
- **Response:**

```json
{
  "success": true,
  "data": { "id": "note123", "title": "string", "content": "string" }
}
```

---

## 💬 Chat API

> **Requires Bearer Token header**

### Create / Continue Chat

- **Endpoint:** `POST /api/chat`
- **Body:**

```json
{
  "id": "chat123",
  "message": {
    "id": "msg123",
    "role": "user", // allowed: "system" | "user" | "assistant"
    "parts": [
      {
        "type": "text", // currently only "text" supported
        "text": "Hello AI!"
      }
    ]
  },
  "selectedModelId": "gpt-4",
  "selectedToolName": "createNote?"
}
```

- **Response:** Streaming AI response (UIMessage format).

---

### Get User Chats

- **Endpoint:** `GET /api/chat`
- **Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "chat123",
      "title": "Generated title",
      "createdAt": "...",
      "updatedAt": "..."
    }
  ]
}
```

---

### Get Chat by ID

- **Endpoint:** `GET /api/chat/:id`
- **Response:**

```json
{
  "success": true,
  "data": {
    "id": "chat123",
    "title": "Generated title",
    "messages": [
      {
        "id": "msg123",
        "role": "user",
        "parts": [{ "type": "text", "text": "Hello AI!" }],
        "createdAt": "..."
      }
    ]
  }
}
```

---

## 💳 Subscription API

> **Requires Bearer Token header**

### Upgrade Subscription

- **Endpoint:** `POST /api/subscription/upgrade`
- **Body:**

```json
{
  "plan": "plus | premium",
  "callbackUrl": "https://yourapp.com/callback"
}
```

- **Response:**

```json
{
  "success": true,
  "checkoutUrl": "https://stripe-checkout-session-url"
}
```

---

### Check Generation Limits

- **Endpoint:** `GET /api/subscription/generations`
- **Response:**

```json
{
  "success": true,
  "data": {
    "isAllowed": true,
    "hasPaidSubscription": false,
    "plan": "FREE",
    "generationsUsed": 5,
    "generationsLimit": 50,
    "remainingGenerations": 45,
    "periodStart": "2025-09-01T00:00:00.000Z",
    "periodEnd": "2025-09-30T23:59:59.999Z"
  }
}
```

- **Errors:**

  - `404 Not Found` → `{ "error": "No active subscription" }`
  - `500 Internal Server Error` → `{ "error": "Invalid plan" }`
