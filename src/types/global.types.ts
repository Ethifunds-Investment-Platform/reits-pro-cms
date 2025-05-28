
export type PaginatedResponse<T> = {
	docs: T[];
	totalDocs: number;
	limit: number;
	page: number;
	totalPages: number;
	hasNextPage: boolean;
	nextPage: number | null;
	hasPrevPage: boolean;
	prevPage: number | null;
	pagingCounter: number;
};

export type PaginationQuery = {
	page: number;
	limit?: number;
};

export type ApprovalStatus = "pending" | "approved" | "rejected";
export type ProjectStatus = "active" | "completed" | "cancelled";
export type InvestmentStatus = "active" | "completed" | "cancelled";
