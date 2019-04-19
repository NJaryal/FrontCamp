
export class NewError extends Error {
  constructor(...params) {
    super(...params);

    // Maintains proper stack (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}