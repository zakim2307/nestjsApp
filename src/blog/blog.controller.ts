import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Param,
  NotFoundException,
  Put,
  Query,
  Delete,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { ValidateObjectId } from './shared/pipes/validate-object-id.pipes';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/post')
  async addPost(@Res() res, @Body() createPostDTO: CreatePostDTO) {
    const newPost = await this.blogService.addPost(createPostDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Post has been submitted successfully',
      post: newPost,
    });
  }

  @Get('post/:postID')
  async getPost(@Res() res, @Param('postID', new ValidateObjectId()) postID) {
    const post = await this.blogService.getPost(postID);
    if (!post) {
      throw new NotFoundException('Post does not exist');
    }

    return res.status(HttpStatus.OK).json(post);
  }

  @Get('posts')
  async getPosts(@Res() res) {
    const posts = await this.blogService.getPosts();
    return res.status(HttpStatus.OK).json(posts);
  }

  @Put('/edit/:postID')
  async editPost(
    @Res() res,
    @Param('postID', new ValidateObjectId()) postID,
    @Body() createPostDTO: CreatePostDTO,
  ) {
    console.log('hey', postID);
    const editedPost = await this.blogService.editPost(postID, createPostDTO);
    if (!editedPost) {
      throw new NotFoundException('Post does not Exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has Been Updated Succesfully',
      post: editedPost,
    });
  }

  @Delete('/delete/:postID')
  async deletePost(
    @Res() res,
    @Param('postID', new ValidateObjectId()) postID,
  ) {
    console.log('post id', postID);
    const deletedPost = await this.blogService.deletePost(postID);
    if (!deletedPost) {
      throw new NotFoundException('Post Does Not Exist');
    }
    return res.status(HttpStatus.OK).json({
      message: 'Post has been deleted',
      post: deletedPost,
    });
  }
}
