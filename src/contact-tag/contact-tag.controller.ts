import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ContactTagService } from './contact-tag.service';
import { CreateContactTagDto } from './dto/create-contact-tag.dto';
import { UpdateContactTagDto } from './dto/update-contact-tag.dto';
import { IdDto } from 'src/dto/id.dto';
import { Id } from 'src/decorators/id.decorator';

@Controller('contacts-tags')
export class ContactTagController {
  constructor(private readonly contactTagService: ContactTagService) {}

  // @Post()
  create(@Body() createContactTagDto: CreateContactTagDto) {
    return this.contactTagService.create(createContactTagDto);
  }

  @Get()
  findAll() {
    return this.contactTagService.findAll();
  }

  @Get(':id')
  findOne(@Id() id: string) {
    return this.contactTagService.findOne(id);
  }

  @Patch(':id')
  update(
    @Id() id: string,
    @Body() updateContactTagDto: UpdateContactTagDto
  ) {
    return this.contactTagService.update(id, updateContactTagDto);
  }

  @Delete(':id')
  remove(@Id() id: string) {
    return this.contactTagService.remove(id);
  }
}
