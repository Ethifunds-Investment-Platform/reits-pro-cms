# Users API Documentation

## Get All Users

### GET /users

Retrieves a paginated list of all users with optional filtering.

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `search` (optional): Search term to filter users
- `role` (optional): Filter by user role (one of: "developer", "investor")
- `status` (optional): Filter by user status (one of: "active", "inactive")

**Response (200 OK):**

```json
{
	"data": {
		"docs": [
			{
				"id": "usr_123",
				"email": "john.doe@example.com",
				"phone_number": "+1234567890",
				"last_login": "2024-03-15T09:00:00Z",
				"role": "investor",
				"name": "John Doe",
				"email_verified": true,
				"profile_picture": "https://example.com/profiles/john-doe.jpg",
				"status": "active",
				"two_factor_enabled": false,
				"bank_accounts": [
					{
						"id": "bank_123",
						"account_name": "John Doe",
						"account_number": "1234567890",
						"bank_name": "Example Bank"
					}
				],
				"created_at": "2024-03-15T10:00:00Z",
				"updated_at": "2024-03-15T10:00:00Z"
			}
		],
		"totalDocs": 100,
		"limit": 10,
		"page": 1,
		"totalPages": 10,
		"hasNextPage": true,
		"nextPage": 2,
		"hasPrevPage": false,
		"prevPage": null,
		"pagingCounter": 1
	}
}
```

## Get User by ID

### GET /users/:id

Retrieves detailed information about a specific user, including their active investments.

**Response (200 OK):**

```json
{
	"data": {
		"user": {
			"id": "usr_123",
			"email": "john.doe@example.com",
			"phone_number": "+1234567890",
			"last_login": "2024-03-15T09:00:00Z",
			"role": "investor",
			"name": "John Doe",
			"email_verified": true,
			"profile_picture": "https://example.com/profiles/john-doe.jpg",
			"status": "active",
			"two_factor_enabled": false,
			"bank_accounts": [
				{
					"id": "bank_123",
					"account_name": "John Doe",
					"account_number": "1234567890",
					"bank_name": "Example Bank"
				}
			],
			"created_at": "2024-03-15T10:00:00Z",
			"updated_at": "2024-03-15T10:00:00Z"
		},
		"active_investments": [
			{
				"id": "inv_456",
				"project_id": "proj_789",
				"investor": {
					"id": "usr_123",
					"email": "john.doe@example.com",
					"phone_number": "+1234567890",
					"last_login": "2024-03-15T09:00:00Z",
					"role": "investor",
					"name": "John Doe",
					"email_verified": true,
					"profile_picture": "https://example.com/profiles/john-doe.jpg",
					"status": "active",
					"two_factor_enabled": false,
					"bank_accounts": [
						{
							"id": "bank_123",
							"account_name": "John Doe",
							"account_number": "1234567890",
							"bank_name": "Example Bank"
						}
					],
					"created_at": "2024-03-15T10:00:00Z",
					"updated_at": "2024-03-15T10:00:00Z"
				},
				"investment_amount": 100000,
				"investment_date": "2024-03-15T10:00:00Z",
				"status": "active",
				"created_at": "2024-03-15T10:00:00Z",
				"updated_at": "2024-03-15T10:00:00Z"
			}
		]
	}
}
```

## Get Recent Users

### GET /users/recent

Retrieves a list of recently registered users.

**Response (200 OK):**

```json
{
	"data": [
		{
			"id": "usr_123",
			"email": "john.doe@example.com",
			"phone_number": "+1234567890",
			"last_login": "2024-03-15T09:00:00Z",
			"role": "investor",
			"name": "John Doe",
			"email_verified": true,
			"profile_picture": "https://example.com/profiles/john-doe.jpg",
			"status": "active",
			"two_factor_enabled": false,
			"bank_accounts": [
				{
					"id": "bank_123",
					"account_name": "John Doe",
					"account_number": "1234567890",
					"bank_name": "Example Bank"
				}
			],
			"created_at": "2024-03-15T10:00:00Z",
			"updated_at": "2024-03-15T10:00:00Z"
		}
	]
}
```

## Get Users by Month

### GET /users/by-month

Retrieves user registration statistics grouped by month for a specific year.

**Query Parameters:**

- `year` (optional): The year for which to retrieve statistics (e.g., "2024")

**Response (200 OK):**

```json
{
	"data": {
		"january": 45,
		"february": 52,
		"march": 38,
		"april": 61,
		"may": 43,
		"june": 57,
		"july": 49,
		"august": 55,
		"september": 63,
		"october": 51,
		"november": 48,
		"december": 42
	}
}
```
