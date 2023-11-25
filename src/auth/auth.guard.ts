import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  private apiKey: string;
  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.getOrThrow(`apiKey`);
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const key = this.extractApiKey(request);
    if (key !== this.apiKey) {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractApiKey(request: Request) {
    const key = request.headers[`x-api-key`];
    if (!key) return;
    return key;
  }
}
