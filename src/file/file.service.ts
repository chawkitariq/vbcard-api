import { Injectable } from '@nestjs/common';
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

  findAll(where?: Parameters<typeof this.fileRepository.findBy>['0']) {
    return this.fileRepository.findBy(where);
  }

  findOne(where: Parameters<typeof this.fileRepository.findOneBy>['0']) {
    return this.fileRepository.findOneBy(where);
  }

  exists(where: Parameters<typeof this.fileRepository.existsBy>['0']) {
    return this.fileRepository.existsBy(where);
  }

  update(
    criteria: Parameters<typeof this.fileRepository.update>['0'],
    updateFileDto: UpdateFileDto
  ) {
    return this.fileRepository.update(criteria, updateFileDto);
  }

  remove(criteria: Parameters<typeof this.fileRepository.softDelete>['0']) {
    const mergedCriteria = Object.assign({}, criteria, { deletedAt: IsNull() });
    return this.fileRepository.softDelete(mergedCriteria);
  }
}
