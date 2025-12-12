import { Request, Response, NextFunction } from 'express';

interface LogData {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  userAgent?: string;
  ip: string;
}

export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const startTime = Date.now();
  
  // Store original end function
  const originalEnd = res.end;
  
  // Override res.end to capture response time and status
  res.end = function(chunk?: any, encoding?: any): Response {
    const responseTime = Date.now() - startTime;
    
    const logData: LogData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      responseTime,
      userAgent: req.get('User-Agent'),
      ip: req.ip || req.socket.remoteAddress || 'unknown'
    };
    
    // Format log message
    const logMessage = `[${logData.timestamp}] ${logData.method} ${logData.url} - ${logData.statusCode} - ${logData.responseTime}ms - ${logData.ip}`;
    
    // Log with color coding based on status
    if (logData.statusCode >= 500) {
      console.error(`❌ ${logMessage}`);
    } else if (logData.statusCode >= 400) {
      console.warn(`⚠️  ${logMessage}`);
    } else {
      console.log(`✅ ${logMessage}`);
    }
    
    // Call original end function
    return originalEnd.call(this, chunk, encoding);
  };
  
  next();
}