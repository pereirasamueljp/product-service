import { createLogger, format, Logger, transports } from 'winston';

export class logger {
    private static loggerService: Logger = null;
    static debug(debugText: string) {
        this.createLoggerService()
        if (process.env.DEBUG === 'true') this.loggerService.info(debugText)
    }
    static info(infoText: string) {
        this.createLoggerService()
        this.loggerService.info(infoText)
    }
    static error(errorText: string) {
        this.createLoggerService()
        this.loggerService.error(errorText)
    }
    static warn(warnText: string) {
        this.createLoggerService()
        this.loggerService.warn(warnText)
    }
    private static createLoggerService() {
        this.createLoggerService()
        if (this.loggerService == null) {
            this.loggerService = createLogger({
                format: format.combine(
                    format.timestamp({
                        format: 'DD/MM/YYYY HH:mm:ss'
                    }),
                ),
                transports: [
                    new transports.Console()
                ]
            })
        }
    }
}