export interface PaginationQuery {
    page?: string;
    limit?: string;
    search?: string;
  }

  export interface PaginationResult<T> {
    success: boolean;
    data: T[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
    };
  }
