class ExError extends Error {
  status: number;
  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest() {
    return new ExError(400, "Invalid data sent");
  }

  static notFound(entity: string) {
    return new ExError(404, `The requested ${entity} not found in database`);
  }

  static serverError() {
    return new ExError(500, "Server side error");
  }
}

export default ExError;
