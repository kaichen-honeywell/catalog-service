import { Module } from '@nestjs/common';

import { ApiModule } from 'src/server/api/api.module';
import { ViewModule } from 'src/server/view/view.module';

@Module({
  imports: [ApiModule, ViewModule],
})
export class ServerModule {}
