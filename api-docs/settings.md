# Settings API Documentation

## Change Password

### POST /auth/account/password/change

Changes the admin user's password. Requires the current password for verification.

**Authentication Required:** Yes (Bearer token)

**Request Body:**

```json
{
	"current_password": "currentSecurePassword123",
	"new_password": "newSecurePassword456"
}
```

**Validation Rules:**
- `current_password`: Required
- `new_password`: Required, minimum 8 characters
- New password must be different from current password

**Response (200 OK):**

```json
{
	"data": {
		"message": "Password changed successfully"
	}
}
```

**Error Responses:**

**400 Bad Request** - Validation error:
```json
{
	"error": {
		"message": "New password must be at least 8 characters long"
	}
}
```

**401 Unauthorized** - Invalid current password:
```json
{
	"error": {
		"message": "Current password is incorrect"
	}
}
```

---

## Set PIN

### POST /auth/account/pin/set

Sets a 6-digit PIN for the admin user. This endpoint should only be called when the user doesn't have a PIN set (`has_pin: false`).

**Authentication Required:** Yes (Bearer token)

**Request Body:**

```json
{
	"pin": "123456"
}
```

**Validation Rules:**
- `pin`: Required, exactly 6 numeric digits
- Admin must not already have a PIN set

**Response (200 OK):**

```json
{
	"data": {
		"id": "adm_123",
		"email": "admin@example.com",
		"name": "Admin User",
		"role": "admin",
		"has_pin": true,
		"created_at": "2024-03-15T10:00:00Z",
		"updated_at": "2024-03-15T11:00:00Z"
	}
}
```

**Error Responses:**

**400 Bad Request** - Validation error:
```json
{
	"error": {
		"message": "PIN must be exactly 6 digits"
	}
}
```

**409 Conflict** - PIN already set:
```json
{
	"error": {
		"message": "PIN already set. Use reset endpoint to change PIN"
	}
}
```

---

## Reset PIN

### PATCH /auth/account/pin/reset

Resets the admin user's PIN to a new value. Requires the current PIN for verification.

**Authentication Required:** Yes (Bearer token)

**Request Body:**

```json
{
	"current_pin": "123456",
	"new_pin": "654321"
}
```

**Validation Rules:**
- `current_pin`: Required, exactly 6 numeric digits
- `new_pin`: Required, exactly 6 numeric digits
- New PIN must be different from current PIN
- Admin must have a PIN set (`has_pin: true`)

**Response (200 OK):**

```json
{
	"data": {
		"id": "adm_123",
		"email": "admin@example.com",
		"name": "Admin User",
		"role": "admin",
		"has_pin": true,
		"created_at": "2024-03-15T10:00:00Z",
		"updated_at": "2024-03-15T12:00:00Z"
	}
}
```

**Error Responses:**

**400 Bad Request** - Validation error:
```json
{
	"error": {
		"message": "PIN must be exactly 6 digits"
	}
}
```

**400 Bad Request** - Same PIN:
```json
{
	"error": {
		"message": "New PIN must be different from current PIN"
	}
}
```

**401 Unauthorized** - Invalid current PIN:
```json
{
	"error": {
		"message": "Current PIN is incorrect"
	}
}
```

**404 Not Found** - No PIN set:
```json
{
	"error": {
		"message": "No PIN set. Use set endpoint to create a PIN"
	}
}
```

---

## Notes

### PIN Usage
The PIN is used for sensitive operations such as:
- Fund disbursement
- Approval of high-value transactions
- Other critical admin actions

### Security Best Practices
1. **Password Requirements:**
   - Minimum 8 characters
   - Should differ from current password
   - Consider enforcing complexity rules (uppercase, lowercase, numbers, special characters)

2. **PIN Requirements:**
   - Exactly 6 numeric digits
   - Must differ from current PIN when resetting
   - Consider implementing rate limiting to prevent brute force attacks

3. **Rate Limiting:**
   - Implement rate limiting on all endpoints (recommended: 5 attempts per 15 minutes)
   - Lock account after multiple failed attempts
   - Log all failed authentication attempts

4. **Session Management:**
   - Consider requiring re-authentication for sensitive operations
   - Implement session timeout
   - Invalidate sessions on password/PIN change

