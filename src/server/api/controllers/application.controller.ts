import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Roles } from 'src/server/decorators/roles.decorator';
import { IAppData, INavTemplate, IPortalUser } from '../../../pojo';
import { ApplicationCatalogService } from '../services/application.service';

@Controller('appcatalog')
export class ApplicationCatalogController {
  constructor(private readonly appCatService: ApplicationCatalogService) {}

  @Get()
  //@Roles('admin', 'dev')
  async getNavTemplate(@Req() request): Promise<INavTemplate> {
    const user = { userId: request.user?.userId } as IPortalUser;
    const result = await this.appCatService.getNavTemplateAsync(user);
    return result;
  }

  // @Get(':appid')
  // //@Roles('admin')
  // async getApp(@Param('appid') appid: string): Promise<IAppData> {
  //   const result = await this.appCatService.getAppAsync(appid);
  //   return result;
  // }

  // @Post()
  // @Roles('admin', 'dev')
  // @HttpCode(204)
  // async addApp(@Body() appData: IAppData): Promise<IAppData> {
  //   return await this.appCatService.addAppAsync(appData);
  // }
}
