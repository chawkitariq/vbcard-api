import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  InternalServerErrorException
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileManagerService } from 'src/file-manager/file-manager.service';
import { DataSource } from 'typeorm';
import sizeOf from 'image-size';
import { File } from './entities/file.entity';

@Controller('files')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private readonly fileManagerService: FileManagerService,
    private readonly dataSource: DataSource
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true })) file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const metadata = this.getFileMetadata(file);

      const { id } = await queryRunner.manager.save(File, { ...createFileDto, ...metadata });
      await queryRunner.manager.update(File, id, { alias: `${id}` });

      const path = `${id}.${metadata.extension}`;
      await this.fileManagerService.upload(file.buffer, path);

      await queryRunner.commitTransaction();

      return this.fileService.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException('Something went wrong');
    } finally {
      await queryRunner.release();
    }
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fileService.findOneOrHttpFail(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateFileDto: UpdateFileDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false
      })
    )
    file?: Express.Multer.File
  ) {
    await this.fileService.findOneOrHttpFail(id);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let metadata = {};

      if (file) {
        metadata = this.getFileMetadata(file);
      }

      await queryRunner.manager.update(File, id, { ...updateFileDto, ...metadata });

      if (file) {
        const path = `${id}.${metadata['extension']}`;
        await this.fileManagerService.upload(file.buffer, path);
      }

      await queryRunner.commitTransaction();

      return this.fileService.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException('Something went wrong');
    } finally {
      await queryRunner.release();
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const { extension } = await this.fileService.findOneOrHttpFail(id);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softDelete(File, id);

      const path = `${id}.${extension}`;
      await this.fileManagerService.delete(path);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException('Something went wrong');
    } finally {
      await queryRunner.release();
    }
  }

  getFileMetadata(file: Express.Multer.File) {
    const { originalname, mimetype: type, size, buffer } = file;
    const { width, height } = sizeOf(buffer);
    const [name, extension] = originalname.split('.');

    return {
      name,
      extension,
      size,
      type,
      width,
      height
    };
  }
}
