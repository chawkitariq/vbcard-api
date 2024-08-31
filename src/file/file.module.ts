import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { File } from './entities/file.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileManagerModule } from 'src/file-manager/file-manager.module';

@Module({
  imports: [TypeOrmModule.forFeature([File]), FileManagerModule],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService]
})
export class FileModule {}
