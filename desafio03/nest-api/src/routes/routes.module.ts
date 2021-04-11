import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';

@Module({
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class RoutesModule {}
