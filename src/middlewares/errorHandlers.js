export const notFoundHandler = (req, res, next) => {
    const error = new Error('Not Found');
    error.statusCode = 404;
    next(error);
};

export const errorHandler = (error, req, res, next) => {
    const statusCode = error.status || 500;
    console.log(error.stack);
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error',
    });
};