/**
 * LoggerService - Service de logging centralisé pour KairuFlow
 * Implémente un système de logging structuré, typé et extensible
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  data?: Record<string, unknown>;
  error?: Error;
  duration?: number;
}

export interface LoggerConfig {
  minLevel: LogLevel;
  enableConsole: boolean;
  enableStorage: boolean;
  maxStoredLogs: number;
  contextPrefix?: string;
}

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
  fatal: 4,
};

const LOG_LEVEL_COLORS: Record<LogLevel, string> = {
  debug: '#808080',
  info: '#0066cc',
  warn: '#ff9900',
  error: '#cc0000',
  fatal: '#990000',
};

const LOG_LEVEL_ICONS: Record<LogLevel, string> = {
  debug: '🔍',
  info: 'ℹ️',
  warn: '⚠️',
  error: '❌',
  fatal: '💀',
};

const DEFAULT_CONFIG: LoggerConfig = {
  minLevel: import.meta.env.PROD ? 'info' : 'debug',
  enableConsole: true,
  enableStorage: true,
  maxStoredLogs: 1000,
};

const nativeConsole: Console | undefined = (globalThis as unknown as { console?: Console }).console;

class LoggerService {
  private config: LoggerConfig;
  private logs: LogEntry[] = [];
  private context?: string;
  private performanceMarks: Map<string, number> = new Map();

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  createChild(context: string): LoggerService {
    const child = new LoggerService({
      ...this.config,
      contextPrefix: this.context ? `${this.context}:${context}` : context,
    });
    child.context = this.config.contextPrefix 
      ? `${this.config.contextPrefix}:${context}` 
      : context;
    return child;
  }

  private shouldLog(level: LogLevel): boolean {
    return LOG_LEVEL_PRIORITY[level] >= LOG_LEVEL_PRIORITY[this.config.minLevel];
  }

  private formatForConsole(entry: LogEntry): string {
    const contextStr = entry.context ? `[${entry.context}]` : '';
    return `${LOG_LEVEL_ICONS[entry.level]} ${entry.timestamp} ${contextStr} ${entry.message}`;
  }

  private log(
    level: LogLevel,
    message: string,
    data?: Record<string, unknown>,
    error?: Error
  ): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context: this.context,
      data,
      error,
    };

    if (this.config.enableConsole) {
      const formatted = this.formatForConsole(entry);
      const style = `color: ${LOG_LEVEL_COLORS[level]}; font-weight: bold;`;

      switch (level) {
        case 'debug':
          nativeConsole?.debug?.(`%c${formatted}`, style, data || '');
          break;
        case 'info':
          nativeConsole?.info?.(`%c${formatted}`, style, data || '');
          break;
        case 'warn':
          nativeConsole?.warn?.(`%c${formatted}`, style, data || '');
          break;
        case 'error':
        case 'fatal':
          nativeConsole?.error?.(`%c${formatted}`, style, error || data || '');
          if (error?.stack) {
            nativeConsole?.error?.(error.stack);
          }
          break;
      }
    }

    if (this.config.enableStorage) {
      this.logs.push(entry);
      if (this.logs.length > this.config.maxStoredLogs) {
        this.logs = this.logs.slice(-this.config.maxStoredLogs);
      }
    }
  }

  debug(message: string, data?: Record<string, unknown>): void {
    this.log('debug', message, data);
  }

  info(message: string, data?: Record<string, unknown>): void {
    this.log('info', message, data);
  }

  warn(message: string, data?: Record<string, unknown>): void {
    this.log('warn', message, data);
  }

  error(message: string, error?: Error, data?: Record<string, unknown>): void {
    this.log('error', message, data, error);
  }

  fatal(message: string, error?: Error, data?: Record<string, unknown>): void {
    this.log('fatal', message, data, error);
  }

  startTimer(label: string): void {
    this.performanceMarks.set(label, performance.now());
    this.debug(`Timer started: ${label}`);
  }

  endTimer(label: string): number {
    const start = this.performanceMarks.get(label);
    if (!start) {
      this.warn(`Timer "${label}" was never started`);
      return 0;
    }

    const duration = performance.now() - start;
    this.performanceMarks.delete(label);
    this.info(`Timer "${label}" completed`, { durationMs: Math.round(duration * 100) / 100 });
    return duration;
  }

  async measure<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(label);
    try {
      const result = await fn();
      this.endTimer(label);
      return result;
    } catch (error) {
      this.endTimer(label);
      throw error;
    }
  }

  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  getLogsByLevel(minLevel: LogLevel): LogEntry[] {
    const minPriority = LOG_LEVEL_PRIORITY[minLevel];
    return this.logs.filter(log => LOG_LEVEL_PRIORITY[log.level] >= minPriority);
  }

  getLogsByContext(context: string): LogEntry[] {
    return this.logs.filter(log => log.context?.includes(context));
  }

  clearLogs(): void {
    this.logs = [];
    this.info('Logs cleared');
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  updateConfig(config: Partial<LoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  getConfig(): LoggerConfig {
    return { ...this.config };
  }
}

export const logger = new LoggerService();

export function createLogger(context: string): LoggerService {
  return logger.createChild(context);
}

export { LoggerService };
