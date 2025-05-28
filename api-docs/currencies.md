# Currency API Documentation

## Get All Currencies

### GET /currencies

Retrieves a list of all available currencies in the system.

**Response (200 OK):**

```json
{
	"data": [
		{
			"id": "usd",
			"name": "US Dollar",
			"symbol": "$",
			"code": "USD"
		},
		{
			"id": "eur",
			"name": "Euro",
			"symbol": "€",
			"code": "EUR"
		},
		{
			"id": "gbp",
			"name": "British Pound",
			"symbol": "£",
			"code": "GBP"
		}
	]
}
```

## Get Active Currency

### GET /active-currency

Retrieves the currently active currency for the system.

**Response (200 OK):**

```json
{
	"data": {
		"id": "usd",
		"name": "US Dollar",
		"symbol": "$",
		"code": "USD"
	}
}
```
