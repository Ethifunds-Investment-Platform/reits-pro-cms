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
