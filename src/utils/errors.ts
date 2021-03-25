export class AlreadyExistsError extends Error {
  code: number;
  constructor(message?: string) {
    super(message || "Record already exists!");

    this.code = 409;
  }
}

export class NotFoundError extends Error {
  code: number;
  constructor(message?: string) {
    super(message || "Record not found!");

    this.code = 404;
  }
}

export class InternalError extends Error {
  code: number;
  constructor(message?: string) {
    super(message || "Internal Error!");

    this.code = 500;
  }
}

export class BadRequestError extends Error {
  code: number;
  constructor(message?: string) {
    super(message || "Bad Request!");

    this.code = 400;
  }
}
