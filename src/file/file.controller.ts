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
  InternalServerErrorException,
  BadRequestException
} from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create.dto';
import { UpdateFileDto } from './dto/update.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileManagerService } from 'src/file-manager/file-manager.service';
import { DataSource } from 'typeorm';
import sizeOf from 'image-size';
import { File } from './entities/file.entity';
import { Id } from 'src/decorators/id.decorator';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

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
    @GetUser() owner: User,
    @UploadedFile(new ParseFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @Body() createFileDto: CreateFileDto
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const metadata = this.getFileMetadata(file);

      const { id } = await queryRunner.manager.save(File, {
        ...createFileDto,
        ...metadata,
        owner
      });

      await queryRunner.manager.update(File, id, { alias: `${id}` });

      const path = `${id}.${metadata.extension}`;
      await this.fileManagerService.upload(file.buffer, path);

      await queryRunner.commitTransaction();

      return this.fileService.findOne({ id });
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  @Get()
  findAll(@GetUser('id') ownerId: string) {
    return this.fileService.findAll({
      owner: { id: ownerId }
    });
  }

  @Get(':id')
  async findOne(@GetUser('id') ownerId: string, @Id() id: string) {
    return this.fileService.findOne({
      id,
      owner: { id: ownerId }
    });
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @GetUser('id') ownerId: string,
    @Id() id: string,
    @Body() updateFileDto: UpdateFileDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false
      })
    )
    file?: Express.Multer.File
  ) {
    const isFileExists = await this.fileService.exists({
      id,
      owner: { id: ownerId }
    });

    if (!isFileExists) {
      throw new BadRequestException('File not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      let metadata = {};

      if (file) {
        metadata = this.getFileMetadata(file);
      }

      await queryRunner.manager.update(File, id, {
        ...updateFileDto,
        ...metadata
      });

      if (file) {
        const path = `${id}.${metadata['extension']}`;
        await this.fileManagerService.upload(file.buffer, path);
      }

      await queryRunner.commitTransaction();

      return this.fileService.findOne({ id });
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException();
    } finally {
      await queryRunner.release();
    }
  }

  @Delete(':id')
  async remove(@GetUser('id') ownerId: string, @Id() id: string) {
    const file = await this.fileService.findOne({
      id,
      owner: { id: ownerId }
    });

    if (!file) {
      throw new BadRequestException('File not found');
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.softDelete(File, id);

      const path = `${id}.${file.extension}`;
      await this.fileManagerService.delete(path);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw new InternalServerErrorException();
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
