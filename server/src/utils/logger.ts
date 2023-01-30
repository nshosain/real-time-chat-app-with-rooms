import logger from "pino";
import moment from "moment";

export default logger({
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    },
    base: {
        pid: false
    },
    timestamp: () => `,"time":"${moment().format()}"`
});

export function throwBadRequestError(errorMessage: string) {
    const customError: any = new Error(errorMessage);
    customError.statusCode = 400;
    throw customError;
}