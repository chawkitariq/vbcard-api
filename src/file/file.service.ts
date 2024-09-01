import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from './dto/create.dto';
import { UpdateFileDto } from './dto/update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>
  ) {}

  create(createFileDto: CreateFileDto) {
    const contact = this.fileRepository.create(createFileDto);
    return this.fileRepository.save(contact);
  }

  findAll() {
    return this.fileRepository.find();
  }

  findOne(id: string) {
    return this.fileRepository.findOne({
      where: { id }
    });
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    return this.fileRepository.update(id, updateFileDto);
  }

  remove(id: string) {
    return this.fileRepository.softDelete({
      id,
      deletedAt: IsNull()
    });
  }

  async findOneOrHttpFail(id: string) {
    let file: File | null;

    try {
      file = await this.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException('Something wrong');
    }

    if (!file) {
      throw new NotFoundException('File not found');
    }

    return file;
  }
}
