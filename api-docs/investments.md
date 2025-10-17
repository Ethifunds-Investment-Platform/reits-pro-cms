# Investments API Documentation

## Get Active Investments

### GET /admin/investments

Retrieves a paginated list of all active investments with optional filtering.

**Query Parameters:**

- `page` (optional): Page number for pagination
- `limit` (optional): Number of items per page
- `developer_id` (optional): Filter investments by developer ID
- `search` (optional): Search term to filter investments
- `status` (optional): Filter by project status
- `project_type` (optional): Filter by project type

**Response (200 OK):**

```json
{
	"data": {
		"docs": [
			{
				"id": "proj_123",
				"name": "Example Project",
				"developer_id": "dev_123",
				"developer": {
					"id": "dev_123",
					"email": "developer@example.com",
					"phone_number": "+1234567890",
					"last_login": null,
					"role": "developer",
					"name": "Developer Name",
					"email_verified": true,
					"profile_picture": null,
					"status": "active",
					"two_factor_enabled": false,
					"bank_accounts": [],
					"created_at": "2024-01-01T00:00:00Z",
					"updated_at": "2024-01-01T00:00:00Z"
				},
				"type": "development",
				"description": "Project description",
				"location": {
					"country": "Country",
					"state": "State",
					"fullAddress": "Full address"
				},
				"display_image": "image_url",
				"images": [],
				"risk_factors": [],
				"property_highlights": [],
				"currency_id": "usd",
				"currency": {
					"id": "usd",
					"name": "US Dollar",
					"symbol": "$",
					"code": "USD"
				},
				"funding_goal": 1000000,
				"amount_raised": 0,
				"expected_roi": 10,
				"minimum_investment": 1000,
				"maximum_investment": 100000,
				"tenor_unit": "years",
				"tenor_value": 5,
				"funding_deadline": null,
				"distribution_frequency": "monthly",
				"total_investors": 0,
				"status": "pending",
				"approved_at": null,
				"last_update_at": "2024-01-01T00:00:00Z",
				"project_memo": null,
				"developer_track_record": null,
				"market_analysis": null,
				"financial_projections": null,
				"created_at": "2024-01-01T00:00:00Z",
				"updated_at": "2024-01-01T00:00:00Z",
				"paystack_product_url": ""
			}
		],
		"totalDocs": 1,
		"limit": 10,
		"page": 1,
		"totalPages": 1,
		"hasNextPage": false,
		"nextPage": null,
		"hasPrevPage": false,
		"prevPage": null,
		"pagingCounter": 1
	}
}
```

## Get Project Investors

### GET /admin/investments/:investment_id/investors

Retrieves a list of investors for a specific investment project.

**Query Parameters:**

- `search` (optional): Search term to filter investors

**Response (200 OK):**

```json
{
	"data": [
		{
			"id": "inv_123",
			"project_id": "proj_123",
			"project": {
				// Project object as shown above
			},
			"investor_id": "usr_123",
			"investor": {
				"id": "usr_123",
				"email": "investor@example.com",
				"phone_number": "+1234567890",
				"last_login": null,
				"role": "investor",
				"name": "Investor Name",
				"email_verified": true,
				"profile_picture": null,
				"status": "active",
				"two_factor_enabled": false,
				"bank_accounts": [],
				"created_at": "2024-01-01T00:00:00Z",
				"updated_at": "2024-01-01T00:00:00Z"
			},
			"amount_invested": 10000,
			"investment_date": "2024-01-01T00:00:00Z",
			"created_at": "2024-01-01T00:00:00Z",
			"updated_at": "2024-01-01T00:00:00Z"
		}
	]
}
```

## Export Investors Details

### GET /admin/investments/:investment_id/investors/export

Exports detailed information about investors for a specific investment project.

**Response (200 OK):**

```json
{
	"data": "export_url_string"
}
```

---

## Disburse Funds

### POST /investments/disburse

Disburses funds for a specific investment project. Requires admin authentication and PIN verification.

**Authentication Required:** Yes (Bearer token)

**PIN Verification Required:** Yes

**Request Body:**

```json
{
	"project_id": "proj_123",
	"rio": 15,
	"pin": "123456"
}
```

**Request Parameters:**
- `project_id` (string, required): The ID of the project to disburse funds for
- `rio` (number, required): Return on Investment percentage to disburse (0-100)
- `pin` (string, required): Admin's 6-digit PIN for verification

**Validation Rules:**
- Admin must have a PIN set (`has_pin: true`)
- `pin`: Must be exactly 6 numeric digits
- `pin`: Must match the admin's current PIN
- `rio`: Must be a positive number, typically 0-100
- `project_id`: Must be a valid project ID

**Response (200 OK):**

```json
{
	"data": {
		"message": "Funds disbursed successfully",
		"disbursement_id": "disb_123",
		"project_id": "proj_123",
		"rio_amount": 15,
		"disbursed_at": "2024-03-15T10:00:00Z"
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

**401 Unauthorized** - Invalid PIN:
```json
{
	"error": {
		"message": "Invalid PIN"
	}
}
```

**403 Forbidden** - No PIN set:
```json
{
	"error": {
		"message": "PIN not set. Please set up a PIN in Settings before disbursing funds"
	}
}
```

**404 Not Found** - Project not found:
```json
{
	"error": {
		"message": "Project not found"
	}
}
```

**Notes:**
- The admin must first set up a PIN in Settings before being able to disburse funds
- PIN verification is required for each disbursement operation
- Failed PIN attempts should be logged and rate-limited
- Consider implementing additional security measures such as IP verification or 2FA