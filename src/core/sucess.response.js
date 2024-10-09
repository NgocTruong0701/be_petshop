import { HTTP_STATUS_CODE, HTTP_STATUS_CODE_MESSAGE } from "../constants/http.response.js";

class SuccessResponse {

    constructor({ message, statusCode = HTTP_STATUS_CODE.OK, reasonStatusCode = HTTP_STATUS_CODE_MESSAGE.OK, metadata }) {
        this.message = !message ? reasonStatusCode : message;
        this.status = statusCode;
        this.metadata = metadata;
    };

    send(res, headers = {}) {
        return res.status(this.status).json(this);
    }
}

export class OK extends SuccessResponse {
    constructor({ message, metadata }) {
        super({ message, metadata });
    }
}

export class CREATED extends SuccessResponse {
    constructor({ message, statusCode = HTTP_STATUS_CODE.CREATED, reasonStatusCode = HTTP_STATUS_CODE_MESSAGE.CREATED, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}

export class ACCEPTED extends SuccessResponse {
    constructor({ message, statusCode = HTTP_STATUS_CODE.ACCEPTED, reasonStatusCode = HTTP_STATUS_CODE_MESSAGE.ACCEPTED, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}

export class NO_CONTENT extends SuccessResponse {
    constructor({ message, statusCode = HTTP_STATUS_CODE.NO_CONTENT, reasonStatusCode = HTTP_STATUS_CODE_MESSAGE.NO_CONTENT, metadata }) {
        super({ message, statusCode, reasonStatusCode, metadata });
    }
}