export const BAD_REQUEST = {
  code: 400,
  message: "incorrect data in the request",
};
export const AUTHORISATION_ERROR = {
  code: 401,
  message:
    "Error! Access to the requested resource is denied. Please login or check your permissions and try again",
};
export const FORBIDDEN_ERROR = {
  code: 403,
  message: "You do not have permission to delete this card",
};
export const NOT_FOUND = {
  code: 404,
  message: "The requested entity not found in database",
};
export const NOT_FOUND_PAGE = {
  code: 404,
  message:
    "The requested page was not found, please check if the input URL is correct",
};
export const SERVER_ERROR = { code: 500, message: "Server side error" };
