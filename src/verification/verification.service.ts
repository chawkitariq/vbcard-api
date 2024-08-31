import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Verification } from './entities/verification.entity';
import { Repository } from 'typeorm';
import { CreateVerificationDto } from './dto/create.dto';
import { UpdateVerificationDto } from './dto/update.dto';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(Verification)
    private readonly verificationRepository: Repository<Verification>
  ) {}

  create(createVerificationDto: CreateVerificationDto) {
    const verification = this.verificationRepository.create(createVerificationDto);
    return this.verificationRepository.save(verification);
  }

  findOneByToken(token: string) {
    return this.verificationRepository.findOneBy({
      token
    });
  }

  async update(id: string, updateVerificationDto: UpdateVerificationDto) {
    return this.verificationRepository.update(id, updateVerificationDto);
  }
}
