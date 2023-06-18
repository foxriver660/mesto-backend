import {
  BAD_REQUEST,
  NOT_FOUND,
  NOT_FOUND_PAGE,
} from "../constants/errorsStatus";

class ExError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static badRequest() {
    return new ExError(BAD_REQUEST.code, BAD_REQUEST.message);
  }

  static notFoundRequest() {
    return new ExError(NOT_FOUND.code, NOT_FOUND.message);
  }

  static notFoundPageRequest() {
    return new ExError(NOT_FOUND_PAGE.code, NOT_FOUND_PAGE.message);
  }
}

export default ExError;
