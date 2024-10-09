import { HTTP_STATUS_CODE, HTTP_STATUS_CODE_MESSAGE } from '../constants/http.response.js';

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.status = statusCode;
    }
}

export class ConflictRequestError extends ErrorResponse {
    constructor(message = HTTP_STATUS_CODE_MESSAGE.CONFLICT, statusCode = HTTP_STATUS_CODE.CONFLICT) {
        super(message, statusCode);
    }
}

export class BadRequestError extends ErrorResponse {
    constructor(message = HTTP_STATUS_CODE_MESSAGE.BAD_REQUEST, statusCode = HTTP_STATUS_CODE.BAD_REQUEST) {
        super(message, statusCode);
    }
}

export class UnauthorizedError extends ErrorResponse {
    constructor(message = HTTP_STATUS_CODE_MESSAGE.UNAUTHORIZED, statusCode = HTTP_STATUS_CODE.UNAUTHORIZED) {
        super(message, statusCode);
    }
}

export class ForbiddenError extends ErrorResponse {
    constructor(message = HTTP_STATUS_CODE_MESSAGE.FORBIDDEN, statusCode = HTTP_STATUS_CODE.FORBIDDEN) {
        super(message, statusCode);
    }
}

export class NotFoundError extends ErrorResponse {
    constructor(message = HTTP_STATUS_CODE_MESSAGE.NOT_FOUND, statusCode = HTTP_STATUS_CODE.NOT_FOUND) {
        super(message, statusCode);
    }
}

export class InternalServerError extends ErrorResponse {
    constructor(message = HTTP_STATUS_CODE_MESSAGE.INTERNAL_SERVER_ERROR, statusCode = HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        super(message, statusCode);
    }
}