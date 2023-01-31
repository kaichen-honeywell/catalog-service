import { Controller, Get, Res } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@Controller('auth')
@ApiExcludeController()
export class AuthController {
  @Get()
  async auth(@Res() res) {
    return res.redirect('/auth/login');
  }
}
