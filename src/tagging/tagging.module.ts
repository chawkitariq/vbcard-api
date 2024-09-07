import { Module } from '@nestjs/common';
import { TaggingService } from './tagging.service';
import { TaggingController } from './tagging.controller';
import { Tagging } from './entities/tagging.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Tagging])],
  controllers: [TaggingController],
  providers: [TaggingService]
})
export class TaggingModule {}
