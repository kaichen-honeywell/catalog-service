import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IAppData, IPortalUser } from '../../../pojo';
import { Repository } from 'typeorm';
import * as appData from '../db/appdata.json';
import {
  ApplicationEntity,
  convertAppDataToEntity,
  convertDtoToAppData,
} from '../entity/app.entity';
@Injectable()
export class ApplicationCatalogService {
  constructor(
    @InjectRepository(ApplicationEntity)
    private appRepository: Repository<ApplicationEntity>,
  ) {}

  async getApplistAsync(user: IPortalUser): Promise<IAppData[]> {
    if (user.userId === 'dbuser') {
      const apps = await this.appRepository.find({
        relations: {
          appRoutes: true,
        },
      });
      if (apps) {
        return Promise.resolve(apps.map((app) => convertDtoToAppData(app)));
      }
    } else {
      return Promise.resolve(appData);
    }
  }
  async getAppAsync(appId: string): Promise<any> {
    console.log(appId);
    return Promise.resolve(appData.find((app) => app.appId === appId));
  }

  async addAppAsync(appData: IAppData): Promise<IAppData> {
    const dto = convertAppDataToEntity(appData);
    const str = JSON.stringify(dto);
    console.log(str);
    const existed = await this.appRepository.exist({
      where: { appId: appData.appId },
    });
    if (existed) {
      throw new BadRequestException('duplicated id found');
    }
    await this.appRepository.save(dto);
    return Promise.resolve(appData);
  }

  async deleteAppAsync(appId: string): Promise<void> {
    await this.appRepository.delete(appId);
    return Promise.resolve();
  }

  async updateAppAsync(appData: IAppData): Promise<IAppData> {
    return Promise.resolve(appData);
  }
}
