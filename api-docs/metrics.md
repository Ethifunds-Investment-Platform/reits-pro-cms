# Metrics API Documentation

## Get Dashboard Metrics

### GET /metrics

Retrieves key metrics for the dashboard, including user counts, project statistics, investments, and revenue data.

**Response (200 OK):**

```json
{
	"data": {
		"total_users": 45678,
		"active_projects": 234,
		"total_investments": 123456789,
		"revenue": 9876543210
	}
}
```

## Get Revenue by Month

### GET /revenue-by-month

Retrieves monthly revenue data for a specific year.

**Query Parameters:**

- `year` (optional): The year for which to retrieve revenue data (e.g., "2024")

**Response (200 OK):**

```json
{
	"data": {
		"january": 45678,
		"february": 56789,
		"march": 67890,
		"april": 78901,
		"may": 89012,
		"june": 90123,
		"july": 89012,
		"august": 78901,
		"september": 67890,
		"october": 56789,
		"november": 45678,
		"december": 34567
	}
}
```
