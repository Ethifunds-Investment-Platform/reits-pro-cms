# Account API Documentation

## Login Admin

### POST /auth/login

Authenticates an admin user and returns a session token.

**Request Body:**

```json
{
	"email": "admin@example.com",
	"password": "securepassword123"
}
```

**Response (200 OK):**

```json
{
	"data": {
		"user": {
			"id": "adm_123",
			"email": "admin@example.com",
			"name": "Admin User",
			"role": "admin",
			"created_at": "2024-03-15T10:00:00Z",
			"updated_at": "2024-03-15T10:00:00Z"
		},
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
	}
}
```

## Get Current User

### GET /auth/whoami

Retrieves the currently authenticated user's information.

**Response (200 OK):**

```json
{
	"data": {
		"id": "adm_123",
		"email": "admin@example.com",
		"name": "Admin User",
		"role": "admin",
		"created_at": "2024-03-15T10:00:00Z",
		"updated_at": "2024-03-15T10:00:00Z"
	}
}
```

## Update Account

### PATCH /auth/account/update

Updates the current user's account information.

**Request Body:**

```json
{
	"name": "Updated Name"
}
```

**Response (200 OK):**

```json
{
	"data": {
		"id": "adm_123",
		"email": "admin@example.com",
		"name": "Updated Name",
		"role": "admin",
		"created_at": "2024-03-15T10:00:00Z",
		"updated_at": "2024-03-15T11:00:00Z"
	}
}
```

## Send OTP

### POST /auth/otp/send

Sends a one-time password to the user's email for verification.

**Request Body:**

```json
{
	"email": "admin@example.com"
}
```

**Response (200 OK):**

```json
{
	"data": {
		"message": "OTP sent successfully",
		"expires_at": "2024-03-15T10:05:00Z"
	}
}
```

## Verify OTP

### POST /auth/otp/verify

Verifies the one-time password sent to the user.

**Request Body:**

```json
{
	"email": "admin@example.com",
	"otp": "123456"
}
```

**Response (200 OK):**

```json
{
	"data": {
		"message": "OTP verified successfully",
		"verified_at": "2024-03-15T10:02:00Z"
	}
}
```

## Reset Password

### POST /auth/password/reset

Resets the user's password after OTP verification.

**Request Body:**

```json
{
	"email": "admin@example.com",
	"otp": "123456",
	"new_password": "newSecurePassword123"
}
```

**Response (200 OK):**

```json
{
	"data": {
		"message": "Password reset successfully",
		"reset_at": "2024-03-15T10:03:00Z"
	}
}
```

## Logout

### POST /auth/logout

Logs out the current user and invalidates their session token.

**Response (200 OK):**

```json
{
	"data": {
		"message": "Logged out successfully"
	}
}
```
