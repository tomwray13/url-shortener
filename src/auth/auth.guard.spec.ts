import { AuthGuard } from './auth.guard';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let configService: DeepMocked<ConfigService>;
  const apiKey = `apiKey`;

  beforeEach(async () => {
    configService = createMock<ConfigService>();
    configService.getOrThrow.mockReturnValue(apiKey);
    authGuard = new AuthGuard(configService);
  });
  it('should be defined', () => {
    expect(authGuard).toBeDefined();
  });

  it(`should return true when the API key is valid`, () => {
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': apiKey,
          },
        }),
      }),
    });
    const result = authGuard.canActivate(mockExecutionContext);

    expect(result).toBe(true);
  });

  it(`should return error when the API key is invalid`, () => {
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': 'invalid',
          },
        }),
      }),
    });
    const result = () => authGuard.canActivate(mockExecutionContext);

    expect(result).toThrow(UnauthorizedException);
  });

  it(`should return error when the API header does not exist`, () => {
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {},
        }),
      }),
    });
    const result = () => authGuard.canActivate(mockExecutionContext);

    expect(result).toThrow(UnauthorizedException);
  });
});
