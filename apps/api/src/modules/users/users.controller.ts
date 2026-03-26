import {
  Controller, Get, Patch, Post, Body, UseGuards, Request,
  UseInterceptors, UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';

const avatarStorage = diskStorage({
  destination: join(process.cwd(), 'apps', 'api', 'uploads', 'users', 'photos'),
  filename: (_req, file, cb) => {
    cb(null, `${randomUUID()}${extname(file.originalname).toLowerCase()}`);
  },
});

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@Request() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Update level, styles, academy, or fcmToken' })
  updateProfile(@Request() req: any, @Body() dto: UpdateUserDto) {
    return this.usersService.update(req.user.id, dto);
  }

  @Post('profile/photo')
  @ApiOperation({ summary: 'Upload profile photo' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file', {
    storage: avatarStorage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowed = /jpeg|jpg|png|webp/;
      cb(null, allowed.test(extname(file.originalname).toLowerCase()));
    },
  }))
  async uploadPhoto(@Request() req: any, @UploadedFile() file: Express.Multer.File) {
    const photoUrl = `/uploads/users/photos/${file.filename}`;
    return this.usersService.update(req.user.id, { photoUrl });
  }
}
