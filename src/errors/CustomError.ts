import { BAD_REQUEST, NOT_FOUND } from "../constants/errorsStatus";

class ExError extends Error {
  status: number;

  message: string;

  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }

  static badRequest() {
    return new ExError(BAD_REQUEST.code, BAD_REQUEST.message);
  }

  static notFoundRequest() {
    return new ExError(NOT_FOUND.code, NOT_FOUND.message);
  }
}

export default ExError;
