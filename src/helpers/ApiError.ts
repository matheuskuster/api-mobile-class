export class ApiError extends Error {
  status: number;

  constructor(params: {
    status?: number;
    message: string;
    error?: Error
    log?: string;
  }) {
    super(params.message);
    this.status = params.status ?? 500;
  }
}
