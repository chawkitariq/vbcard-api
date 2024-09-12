import { Injectable } from '@nestjs/common';
import { CreateVcardDto } from './dto/create-vcard.dto';
import { UpdateVcardDto } from './dto/update-vcard.dto';

@Injectable()
export class VcardService {
  create(createVcardDto: CreateVcardDto) {
    return 'This action adds a new vcard';
  }

  findAll() {
    return `This action returns all vcard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vcard`;
  }

  update(id: number, updateVcardDto: UpdateVcardDto) {
    return `This action updates a #${id} vcard`;
  }

  remove(id: number) {
    return `This action removes a #${id} vcard`;
  }
}
