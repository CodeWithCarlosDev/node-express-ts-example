import config from "../config";

interface InitError {
    stack?: any;
    output: {
        statusCode: number;
        payload: {
            error: string;
            message: any;
        };
    };
}

function withErrorStack(error: InitError, stack: any, isShowStack = config.dev) {
    if (isShowStack) {
        return { ...error, stack };
    }
    return error;
}

export default withErrorStack;