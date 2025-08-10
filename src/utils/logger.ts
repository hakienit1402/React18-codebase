/* eslint-disable no-console */
/**
 * Professional logging utility for the application
 * Provides different log levels and environment-based filtering
 */

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: string;
  data?: unknown;
  error?: Error;
}

class Logger {
  private currentLevel: LogLevel;
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = import.meta.env.MODE === "development";
    this.currentLevel = this.isDevelopment ? LogLevel.DEBUG : LogLevel.WARN;
  }

  private shouldLog(level: LogLevel): boolean {
    return level <= this.currentLevel;
  }

  private formatMessage(entry: LogEntry): string {
    const timestamp = entry.timestamp.toISOString();
    const levelName = LogLevel[entry.level];
    const context = entry.context ? `[${entry.context}]` : "";
    return `${timestamp} ${levelName} ${context} ${entry.message}`;
  }

  private log(entry: LogEntry): void {
    if (!this.shouldLog(entry.level)) return;

    const formattedMessage = this.formatMessage(entry);

    switch (entry.level) {
      case LogLevel.ERROR:
        if (entry.error) {
          console.error(formattedMessage, entry.error);
        } else {
          console.error(formattedMessage, entry.data);
        }
        break;
      case LogLevel.WARN:
        console.warn(formattedMessage, entry.data);
        break;
      case LogLevel.INFO:
        console.info(formattedMessage, entry.data);
        break;
      case LogLevel.DEBUG:
        console.log(formattedMessage, entry.data);
        break;
    }

    // In production, you might want to send logs to a service
    if (!this.isDevelopment && entry.level <= LogLevel.ERROR) {
      this.sendToLoggingService(entry);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private sendToLoggingService(_entry: LogEntry): void {
    // Placeholder for external logging service integration
    // e.g., Sentry, LogRocket, DataDog, etc.
    try {
      // Example: Send to external service
      // logService.send(_entry);
    } catch (error) {
      // Failsafe: don't let logging errors break the app
      console.error("Failed to send log to external service:", error);
    }
  }

  public error(
    message: string,
    error?: Error | unknown,
    context?: string,
  ): void {
    this.log({
      level: LogLevel.ERROR,
      message,
      timestamp: new Date(),
      context,
      error: error instanceof Error ? error : undefined,
      data: error instanceof Error ? undefined : error,
    });
  }

  public warn(message: string, data?: unknown, context?: string): void {
    this.log({
      level: LogLevel.WARN,
      message,
      timestamp: new Date(),
      context,
      data,
    });
  }

  public info(message: string, data?: unknown, context?: string): void {
    this.log({
      level: LogLevel.INFO,
      message,
      timestamp: new Date(),
      context,
      data,
    });
  }

  public debug(message: string, data?: unknown, context?: string): void {
    this.log({
      level: LogLevel.DEBUG,
      message,
      timestamp: new Date(),
      context,
      data,
    });
  }

  public setLevel(level: LogLevel): void {
    this.currentLevel = level;
  }

  public getLevel(): LogLevel {
    return this.currentLevel;
  }
}

// Export singleton instance
export const logger = new Logger();

// Export convenience functions
export const logError = (
  message: string,
  error?: Error | unknown,
  context?: string,
) => logger.error(message, error, context);

export const logWarn = (message: string, data?: unknown, context?: string) =>
  logger.warn(message, data, context);

export const logInfo = (message: string, data?: unknown, context?: string) =>
  logger.info(message, data, context);

export const logDebug = (message: string, data?: unknown, context?: string) =>
  logger.debug(message, data, context);
