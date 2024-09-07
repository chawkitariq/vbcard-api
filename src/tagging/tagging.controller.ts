import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TaggingService } from './tagging.service';
import { CreateTaggingDto } from './dto/create-tagging.dto';
import { UpdateTaggingDto } from './dto/update-tagging.dto';

@Controller('tagging')
export class TaggingController {
  constructor(private readonly taggingService: TaggingService) {}

  @Post()
  create(@Body() createTaggingDto: CreateTaggingDto) {
    return this.taggingService.create(createTaggingDto);
  }

  @Get()
  findAll() {
    return this.taggingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taggingService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaggingDto: UpdateTaggingDto) {
    return this.taggingService.update(id, updateTaggingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taggingService.remove(id);
  }
}
