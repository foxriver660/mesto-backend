const ErrorCode = {
  BAD_REQUEST: 400,
  AUTHORISATION: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER: 500,
};

const ErrorMessage = {
  BAD_REQUEST: "Incorrect data in the request",
  AUTHORISATION:
    "Error! Access to the requested resource is denied. Please login or check your permissions and try again",
  FORBIDDEN: "You do not have permission to delete this card",
  NOT_FOUND: "The requested entity not found in database",
  NOT_FOUND_PAGE:
    "The requested page was not found, please check if the input URL is correct",
  CONFLICT:
    "Conflict has been detected with the current state of the target resource.",
  SERVER: "Server side error",
};

export const ERROR = {
  CODE: ErrorCode,
  MESSAGE: ErrorMessage,
};
