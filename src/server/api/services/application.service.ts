import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAppData, INavTemplate, IPortalUser } from '../../../pojo';
import { Repository } from 'typeorm';
import * as appData from '../db/appdata.json';
import { ApplicationEntity } from '../entity/app.entity';
@Injectable()
export class ApplicationCatalogService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private appRepository: Repository<ApplicationEntity>,
  ) {}

  async getNavTemplateAsync(user: IPortalUser): Promise<INavTemplate> {
    if (user.userId === 'dbuser') {
      return Promise.reject('not support');
    } else {
      return Promise.resolve(appData);
    }
  }

  // async addAppAsync(appData: IAppData): Promise<IAppData> {
  //   const dto = convertAppDataToEntity(appData);
  //   const str = JSON.stringify(dto);
  //   const existed = await this.appRepository.exist({
  //     where: { appId: appData.appId },
  //   });
  //   if (existed) {
  //     throw new BadRequestException('duplicated id found');
  //   }
  //   await this.appRepository.save(dto);
  //   return Promise.resolve(appData);
  // }

  async deleteAppAsync(appId: string): Promise<void> {
    await this.appRepository.delete(appId);
    return Promise.resolve();
  }

  async updateAppAsync(appData: IAppData): Promise<IAppData> {
    return Promise.resolve(appData);
  }
}
