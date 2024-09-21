import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContactTagService } from './contact-tag.service';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { UpdateContactTagDto } from './dto/update-contact-tag.dto';
import { IdDto } from 'src/dto/id.dto';

@Controller('tags')
export class ContactTagController {
  constructor(private readonly contactTagService: ContactTagService) {}

  @Post()
  create(@Body() createContactTagDto: CreateContactTagDto) {
    return this.contactTagService.create(createContactTagDto);
  }

  @Get()
  findAll() {
    return this.contactTagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') { id }: IdDto) {
    return this.contactTagService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') { id }: IdDto, @Body() updateContactTagDto: UpdateContactTagDto) {
    return this.contactTagService.update(id, updateContactTagDto);
  }

  @Delete(':id')
  remove(@Param('id') { id }: IdDto) {
    return this.contactTagService.remove(id);
  }
}
