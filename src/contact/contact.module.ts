import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { FileModule } from 'src/file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), FileModule],
  controllers: [ContactController],
  providers: [ContactService, ContactController],
  exports: [ContactService, ContactController]
})
export class ContactModule {}
