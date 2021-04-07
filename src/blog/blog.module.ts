import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema } from './schema/blog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Post', schema: BlogSchema }])],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
