import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VcardService } from './vcard.service';
import { CreateVcardDto } from './dto/create-vcard.dto';
import { UpdateVcardDto } from './dto/update-vcard.dto';

@Controller('vcard')
export class VcardController {
  constructor(private readonly vcardService: VcardService) {}

  @Post()
  create(@Body() createVcardDto: CreateVcardDto) {
    return this.vcardService.create(createVcardDto);
  }

  @Get()
  findAll() {
    return this.vcardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vcardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVcardDto: UpdateVcardDto) {
    return this.vcardService.update(+id, updateVcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vcardService.remove(+id);
  }
}
