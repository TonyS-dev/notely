// backend/src/common/filters/typeorm-exception.filter.ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express'; // Import Response type for better typing

// Define an interface for the PostgreSQL driver error
interface PostgresError {
  code: string;
  detail: string;
}

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>(); // Use Response type for better typing

    // Cast the driverError to our new interface
    const driverError = exception.driverError as unknown as PostgresError;

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected database error occurred.';

    // Handle specific PostgreSQL error codes
    switch (driverError.code) {
      case '23505': // Unique violation
        statusCode = HttpStatus.CONFLICT; // 409
        message = `A record with this value already exists. Detail: ${driverError.detail}`;
        break;

      case '23503': // Foreign key violation
        statusCode = HttpStatus.BAD_REQUEST; // 400
        message = `Invalid reference to another record. Detail: ${driverError.detail}`;
        break;

      case '23502': // Not null violation
        statusCode = HttpStatus.BAD_REQUEST; // 400
        message = `A required field is missing. Detail: ${driverError.detail}`;
        break;

      case '22001': // Value too long
        statusCode = HttpStatus.BAD_REQUEST; // 400
        message = `The provided value is too long. Detail: ${driverError.detail}`;
        break;

      default: // For any other error, log it and return a generic message
        console.error('Unhandled TypeORM error:', exception);
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // 500
        message = `An unexpected error occurred. Detail: ${driverError.detail}`;
        break;
    }

    response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      error: `Database Error Code: ${driverError.code}`,
    });
  }
}
