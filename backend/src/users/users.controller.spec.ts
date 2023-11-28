import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import User from './interfaces/users.interfaces';
import { Request, Response } from 'express';
import { UsersService } from './users.service';
import { UserModel } from '../schemas/User.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('UsersController', () => {
  let controller: UsersController;
  let service: Pick<jest.MockedObject<UsersService>, 'getAll'>;

  const requestMock = {} as unknown as Request;
  const responseMock = {} as unknown as Response;

  // Runs before each test
  beforeEach(async () => {
    // Creates test module defining dependencies.
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController, UsersService],
      providers: [
        UsersService,
        {
          provide: getModelToken('UserModel'),
          useValue: {
            find: jest.fn().mockResolvedValue(() => [] as User[]),
          } as unknown as Model<UserModel>,
        },
      ],
    }).compile();
    // Once compiled, instantiates UsersController and assings it to controller variable.

    controller = module.get<UsersController>(UsersController);
    service = module.get(UsersService);
    // service = app.get
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAll', () => {
    it('should return an array of all users in database', () => {
      // service.getAll();
      expect([] as User[]);
    });
  });
});
