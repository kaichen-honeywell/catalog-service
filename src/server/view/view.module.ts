import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ViewController } from './view.controller';
import { ViewService } from './view.service';

@Module({
  imports: [AuthModule],
  providers: [ViewService],
  controllers: [ViewController],
})
export class ViewModule {}
