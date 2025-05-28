# Projects API Documentation

## Get All Projects

### GET /projects

Retrieves a paginated list of all projects with optional filtering.

**Query Parameters:**

- `page` (optional): Page number for pagination (default: 1)
- `limit` (optional): Number of items per page (default: 10)
- `developer_id` (optional): Filter projects by developer ID
- `search` (optional): Search term to filter projects
- `status` (optional): Filter by project status (one of: "pending", "approved", "rejected", "funded", "in-progress", "completed", "sold", "active")
- `project_type` (optional): Filter by project type (one of: "development", "completed")

**Response (200 OK):**

```json
{
	"data": {
		"docs": [
			{
				"id": "proj_123",
				"name": "Luxury Apartments Complex",
				"developer_id": "dev_456",
				"developer": {
					"id": "dev_456",
					"email": "developer@example.com",
					"phone_number": "+1234567890",
					"last_login": "2024-03-15T09:00:00Z",
					"role": "developer",
					"name": "ABC Development Corp",
					"email_verified": true,
					"profile_picture": "https://example.com/profiles/abc-dev.jpg",
					"status": "active",
					"two_factor_enabled": true,
					"bank_accounts": [
						{
							"id": "bank_123",
							"account_name": "ABC Development",
							"account_number": "1234567890",
							"bank_name": "Example Bank"
						}
					],
					"created_at": "2023-01-01T00:00:00Z",
					"updated_at": "2024-03-15T09:00:00Z"
				},
				"type": "development",
				"description": "Modern luxury apartments in downtown area",
				"location": {
					"country": "United States",
					"state": "New York",
					"fullAddress": "123 Main Street, New York, NY 10001"
				},
				"display_image": "https://example.com/projects/luxury-apts-main.jpg",
				"images": [
					"https://example.com/projects/luxury-apts-1.jpg",
					"https://example.com/projects/luxury-apts-2.jpg"
				],
				"risk_factors": ["Market volatility", "Construction delays", "Regulatory changes"],
				"property_highlights": ["Prime location", "High-end finishes", "Smart home features"],
				"currency_id": "usd",
				"currency": {
					"id": "usd",
					"name": "US Dollar",
					"symbol": "$",
					"code": "USD"
				},
				"funding_goal": 5000000,
				"amount_raised": 3750000,
				"expected_roi": 12.5,
				"minimum_investment": 50000,
				"maximum_investment": 500000,
				"tenor_unit": "years",
				"tenor_value": 5,
				"funding_deadline": "2024-12-31T23:59:59Z",
				"distribution_frequency": "monthly",
				"total_investors": 45,
				"status": "active",
				"approved_at": "2024-02-01T10:00:00Z",
				"last_update_at": "2024-03-15T10:00:00Z",
				"project_memo": "https://example.com/docs/project-memo.pdf",
				"developer_track_record": "https://example.com/docs/track-record.pdf",
				"market_analysis": "https://example.com/docs/market-analysis.pdf",
				"financial_projections": "https://example.com/docs/financials.pdf",
				"created_at": "2024-02-01T10:00:00Z",
				"updated_at": "2024-03-15T10:00:00Z",
				"paystack_product_url": "https://paystack.com/pay/proj_123"
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

## Create Project

### POST /projects/create

Creates a new project in the system.

**Request Body:**

```json
{
	"name": "Luxury Apartments Complex",
	"developer_id": "dev_456",
	"description": "Modern luxury apartments in downtown area",
	"location": {
		"country": "United States",
		"state": "New York",
		"fullAddress": "123 Main Street, New York, NY 10001"
	},
	"type": "development",
	"display_image": "https://example.com/projects/luxury-apts-main.jpg",
	"images": [
		"https://example.com/projects/luxury-apts-1.jpg",
		"https://example.com/projects/luxury-apts-2.jpg"
	],
	"risk_factors": ["Market volatility", "Construction delays", "Regulatory changes"],
	"property_highlights": ["Prime location", "High-end finishes", "Smart home features"],
	"currency_id": "usd",
	"funding_goal": 5000000,
	"expected_roi": 12.5,
	"minimum_investment": 50000,
	"maximum_investment": 500000,
	"tenor_unit": "years",
	"tenor_value": 5,
	"funding_deadline": "2024-12-31T23:59:59Z",
	"distribution_frequency": "monthly",
	"project_memo": "https://example.com/docs/project-memo.pdf",
	"developer_track_record": "https://example.com/docs/track-record.pdf",
	"market_analysis": "https://example.com/docs/market-analysis.pdf",
	"financial_projections": "https://example.com/docs/financials.pdf"
}
```

**Response (201 Created):**

```json
{
	"data": {
		"id": "proj_123",
		"name": "Luxury Apartments Complex",
		"developer_id": "dev_456",
		"developer": {
			"id": "dev_456",
			"email": "developer@example.com",
			"phone_number": "+1234567890",
			"last_login": "2024-03-15T09:00:00Z",
			"role": "developer",
			"name": "ABC Development Corp",
			"email_verified": true,
			"profile_picture": "https://example.com/profiles/abc-dev.jpg",
			"status": "active",
			"two_factor_enabled": true,
			"bank_accounts": [
				{
					"id": "bank_123",
					"account_name": "ABC Development",
					"account_number": "1234567890",
					"bank_name": "Example Bank"
				}
			],
			"created_at": "2023-01-01T00:00:00Z",
			"updated_at": "2024-03-15T09:00:00Z"
		},
		"type": "development",
		"description": "Modern luxury apartments in downtown area",
		"location": {
			"country": "United States",
			"state": "New York",
			"fullAddress": "123 Main Street, New York, NY 10001"
		},
		"display_image": "https://example.com/projects/luxury-apts-main.jpg",
		"images": [
			"https://example.com/projects/luxury-apts-1.jpg",
			"https://example.com/projects/luxury-apts-2.jpg"
		],
		"risk_factors": ["Market volatility", "Construction delays", "Regulatory changes"],
		"property_highlights": ["Prime location", "High-end finishes", "Smart home features"],
		"currency_id": "usd",
		"currency": {
			"id": "usd",
			"name": "US Dollar",
			"symbol": "$",
			"code": "USD"
		},
		"funding_goal": 5000000,
		"amount_raised": 3750000,
		"expected_roi": 12.5,
		"minimum_investment": 50000,
		"maximum_investment": 500000,
		"tenor_unit": "years",
		"tenor_value": 5,
		"funding_deadline": "2024-12-31T23:59:59Z",
		"distribution_frequency": "monthly",
		"total_investors": 45,
		"status": "active",
		"approved_at": "2024-02-01T10:00:00Z",
		"last_update_at": "2024-03-15T10:00:00Z",
		"project_memo": "https://example.com/docs/project-memo.pdf",
		"developer_track_record": "https://example.com/docs/track-record.pdf",
		"market_analysis": "https://example.com/docs/market-analysis.pdf",
		"financial_projections": "https://example.com/docs/financials.pdf",
		"created_at": "2024-02-01T10:00:00Z",
		"updated_at": "2024-03-15T10:00:00Z",
		"paystack_product_url": "https://paystack.com/pay/proj_123"
	}
}
```

## Get Project by ID

### GET /projects/:id

Retrieves detailed information about a specific project.

**Response (200 OK):**

```json
{
	"data": {
		"id": "proj_123",
		"name": "Luxury Apartments Complex",
		"developer_id": "dev_456",
		"developer": {
			"id": "dev_456",
			"email": "developer@example.com",
			"phone_number": "+1234567890",
			"last_login": "2024-03-15T09:00:00Z",
			"role": "developer",
			"name": "ABC Development Corp",
			"email_verified": true,
			"profile_picture": "https://example.com/profiles/abc-dev.jpg",
			"status": "active",
			"two_factor_enabled": true,
			"bank_accounts": [
				{
					"id": "bank_123",
					"account_name": "ABC Development",
					"account_number": "1234567890",
					"bank_name": "Example Bank"
				}
			],
			"created_at": "2023-01-01T00:00:00Z",
			"updated_at": "2024-03-15T09:00:00Z"
		},
		"type": "development",
		"description": "Modern luxury apartments in downtown area",
		"location": {
			"country": "United States",
			"state": "New York",
			"fullAddress": "123 Main Street, New York, NY 10001"
		},
		"display_image": "https://example.com/projects/luxury-apts-main.jpg",
		"images": [
			"https://example.com/projects/luxury-apts-1.jpg",
			"https://example.com/projects/luxury-apts-2.jpg"
		],
		"risk_factors": ["Market volatility", "Construction delays", "Regulatory changes"],
		"property_highlights": ["Prime location", "High-end finishes", "Smart home features"],
		"currency_id": "usd",
		"currency": {
			"id": "usd",
			"name": "US Dollar",
			"symbol": "$",
			"code": "USD"
		},
		"funding_goal": 5000000,
		"amount_raised": 3750000,
		"expected_roi": 12.5,
		"minimum_investment": 50000,
		"maximum_investment": 500000,
		"tenor_unit": "years",
		"tenor_value": 5,
		"funding_deadline": "2024-12-31T23:59:59Z",
		"distribution_frequency": "monthly",
		"total_investors": 45,
		"status": "active",
		"approved_at": "2024-02-01T10:00:00Z",
		"last_update_at": "2024-03-15T10:00:00Z",
		"project_memo": "https://example.com/docs/project-memo.pdf",
		"developer_track_record": "https://example.com/docs/track-record.pdf",
		"market_analysis": "https://example.com/docs/market-analysis.pdf",
		"financial_projections": "https://example.com/docs/financials.pdf",
		"created_at": "2024-02-01T10:00:00Z",
		"updated_at": "2024-03-15T10:00:00Z",
		"paystack_product_url": "https://paystack.com/pay/proj_123"
	}
}
```

## Update Project Status

### PUT /projects/:id/status

Updates the status of a specific project.

**Request Body:**

```json
{
	"status": "completed"
}
```

**Valid Status Values:**

- "pending"
- "approved"
- "rejected"
- "funded"
- "in-progress"
- "completed"
- "sold"
- "active"

**Response (200 OK):**

```json
{
	"data": {
		"id": "proj_123",
		"status": "completed",
		"updated_at": "2024-03-15T11:00:00Z"
	}
}
```

## Get Project Updates

### GET /projects/:id/updates

Retrieves a list of updates for a specific project.

**Response (200 OK):**

```json
{
	"data": [
		{
			"id": "upd_123",
			"project_id": "proj_123",
			"title": "Construction Phase 1 Complete",
			"content": "Foundation work has been completed ahead of schedule",
			"images": [
				"https://example.com/updates/phase1-1.jpg",
				"https://example.com/updates/phase1-2.jpg"
			],
			"created_at": "2024-03-15T10:00:00Z",
			"updated_at": "2024-03-15T10:00:00Z"
		}
	]
}
```

## Create Project Update

### POST /projects/:id/updates

Creates a new update for a specific project.

**Request Body:**

```json
{
	"project_id": "proj_123",
	"title": "Construction Phase 1 Complete",
	"content": "Foundation work has been completed ahead of schedule",
	"images": ["https://example.com/updates/phase1-1.jpg", "https://example.com/updates/phase1-2.jpg"]
}
```

**Response (201 Created):**

```json
{
	"data": {
		"id": "upd_123",
		"project_id": "proj_123",
		"title": "Construction Phase 1 Complete",
		"content": "Foundation work has been completed ahead of schedule",
		"images": [
			"https://example.com/updates/phase1-1.jpg",
			"https://example.com/updates/phase1-2.jpg"
		],
		"created_at": "2024-03-15T10:00:00Z",
		"updated_at": "2024-03-15T10:00:00Z"
	}
}
```
