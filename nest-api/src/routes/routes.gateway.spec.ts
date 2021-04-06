import { Test, TestingModule } from '@nestjs/testing';
import { RoutesGateway } from './routes.gateway';

describe('RoutesGateway', () => {
  let gateway: RoutesGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RoutesGateway],
    }).compile();

    gateway = module.get<RoutesGateway>(RoutesGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
