import { Test, TestingModule } from '@nestjs/testing';
import { UrlService } from './url.service';
import { ConfigService } from '@nestjs/config';
import { UidService } from '../../services/uid/uid.service';
import { DatabaseService } from '../../database/database.service';
import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { mockDeep, DeepMockProxy } from 'jest-mock-extended';
import {
  generateUrlArray,
  generateUrlPayload,
  host,
  uid,
} from './__tests__/test-utils';

describe('UrlService', () => {
  let urlService: UrlService;
  let uidService: DeepMocked<UidService>;
  let configService: DeepMocked<ConfigService>;
  let databaseService: DeepMockProxy<DatabaseService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: UidService,
          useValue: createMock<UidService>(),
        },
        {
          provide: ConfigService,
          useValue: createMock<ConfigService>(),
        },
        {
          provide: DatabaseService,
          useValue: mockDeep<DatabaseService>(),
        },
      ],
    }).compile();

    urlService = module.get<UrlService>(UrlService);
    uidService = module.get(UidService);
    configService = module.get(ConfigService);
    databaseService = module.get(DatabaseService);
  });

  it('should be defined', () => {
    expect(urlService).toBeDefined();
    expect(uidService).toBeDefined();
    expect(configService).toBeDefined();
    expect(databaseService).toBeDefined();
  });

  describe(`create`, () => {
    it(`should create a url`, async () => {
      // Arrange
      const payload = generateUrlPayload({});
      uidService.generate.mockReturnValueOnce(uid); // <-- this line is controlling the output of the uid.generate() double
      databaseService.url.create.mockResolvedValueOnce(payload); // <-- this line is controlling the output of the database.url.create double

      // Act
      const url = await urlService.create({
        redirect: payload.redirect,
        title: payload.title,
        ...(payload.description && { description: payload.description }),
      });

      // Asserts
      expect(url).toEqual(payload);
    });
    it(`should create a url with missing description`, async () => {
      // Arrange
      const payload = generateUrlPayload({ description: null });
      uidService.generate.mockReturnValueOnce(uid); // <-- this line is controlling the output of the uid.generate() double
      databaseService.url.create.mockResolvedValueOnce(payload); // <-- this line is controlling the output of the database.url.create double

      // Act
      const url = await urlService.create({
        redirect: payload.redirect,
        title: payload.title,
      });

      // Asserts
      expect(url).toEqual(payload);
    });
  });

  describe(`findAll`, () => {
    it(`should return array of urls in data property`, async () => {
      const response = generateUrlArray();
      databaseService.url.findMany.mockResolvedValueOnce(response);
      databaseService.url.count.mockResolvedValueOnce(response.length);

      const url = await urlService.findAll({});

      expect(url.data).toEqual(response);
    });

    it(`should return empty array when no urls exist`, async () => {
      databaseService.url.findMany.mockResolvedValueOnce([]);
      databaseService.url.count.mockResolvedValueOnce(0);

      const url = await urlService.findAll({});

      expect(url.data).toEqual([]);
    });

    it(`should correctly indicate first page`, async () => {
      databaseService.url.findMany.mockResolvedValue(generateUrlArray());
      databaseService.url.count.mockResolvedValue(9);

      const getUrlsDto = {
        page: 1,
        limit: 3,
      };
      const result = await urlService.findAll(getUrlsDto);

      expect(result.meta).toEqual({
        totalCount: 9,
        currentPage: 1,
        perPage: 3,
        totalPages: 3,
        hasNextPage: true,
        hasPreviousPage: false,
      });
    });

    it(`should correctly indicate middle page`, async () => {
      databaseService.url.findMany.mockResolvedValue(generateUrlArray());
      databaseService.url.count.mockResolvedValue(9);

      const getUrlsDto = {
        page: 2,
        limit: 3,
      };
      const result = await urlService.findAll(getUrlsDto);

      expect(result.meta).toEqual({
        totalCount: 9,
        currentPage: 2,
        perPage: 3,
        totalPages: 3,
        hasNextPage: true,
        hasPreviousPage: true,
      });
    });

    it(`should correctly indicate last page`, async () => {
      databaseService.url.findMany.mockResolvedValue(generateUrlArray());
      databaseService.url.count.mockResolvedValue(9);

      const getUrlsDto = {
        page: 3,
        limit: 3,
      };
      const result = await urlService.findAll(getUrlsDto);

      expect(result.meta).toEqual({
        totalCount: 9,
        currentPage: 3,
        perPage: 3,
        totalPages: 3,
        hasNextPage: false,
        hasPreviousPage: true,
      });
    });
  });

  describe(`findOne`, () => {
    it(`should return respective url record`, async () => {
      // Arrange
      const uidLookup = uid;
      const payload = generateUrlPayload({});
      databaseService.url.findUnique.mockResolvedValueOnce(
        payload.url === `${host}/${uidLookup}` ? payload : null,
      );

      // Act
      const url = await urlService.findOne(uidLookup);

      // Asserts
      expect(url).toEqual(payload);
    });

    it(`should return null when url record not found`, async () => {
      // Arrange
      const uidLookup = `random url`;
      const payload = generateUrlPayload({});
      databaseService.url.findUnique.mockResolvedValueOnce(
        payload.url === `${host}/${uidLookup}` ? payload : null,
      );

      // Act
      const url = await urlService.findOne(uidLookup);

      // Asserts
      expect(url).toEqual(null);
    });
  });

  describe(`update`, () => {
    it(`should return respective updated url record`, async () => {
      // Arrange
      const original = generateUrlPayload({});
      const updatePayload = { title: `updated title` };
      const payload = { ...original, ...updatePayload };
      const id = payload.id;
      databaseService.url.update.mockResolvedValueOnce(payload);

      // Act
      const url = await urlService.update(id, updatePayload);

      // Asserts
      expect(url).toEqual(payload);
    });
  });

  describe(`remove`, () => {
    it(`should return removed url record`, async () => {
      // Arrange
      const payload = generateUrlPayload({});
      const id = payload.id;
      databaseService.url.delete.mockResolvedValueOnce(payload);

      // Act
      const url = await urlService.remove(id);

      // Asserts
      expect(url).toEqual(payload);
    });
  });
});
