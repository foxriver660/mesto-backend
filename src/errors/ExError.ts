import { ERROR } from "../constants/errorsStatus";

class ExError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static badRequest() {
    return new ExError(ERROR.CODE.BAD_REQUEST, ERROR.MESSAGE.BAD_REQUEST);
  }

  static unauthorized() {
    return new ExError(ERROR.CODE.AUTHORISATION, ERROR.MESSAGE.AUTHORISATION);
  }

  static forbidden() {
    return new ExError(ERROR.CODE.FORBIDDEN, ERROR.MESSAGE.FORBIDDEN);
  }

  static notFoundRequest(message: string) {
    return new ExError(ERROR.CODE.NOT_FOUND, message);
  }

  static conflict() {
    return new ExError(ERROR.CODE.CONFLICT, ERROR.MESSAGE.CONFLICT);
  }
}

export default ExError;
