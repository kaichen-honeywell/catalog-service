import { IAppRoute } from '../../../pojo';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApplicationEntity } from './app.entity';

@Entity({ name: 'routes' })
export class AppRouteEntity {
  @PrimaryGeneratedColumn('increment')
  appRouteId: number;
  @Column({ name: 'defaultname', type: 'varchar', length: 100 })
  defaultName: string; //default name of current route if i18n key is not present, use default name
  @Column({ name: 'rooturl', type: 'varchar', length: 512 })
  rootUrl: string; //root Url
  @Column({ name: 'iconname', type: 'varchar', length: 100 })
  iconName?: string; //
  @Column({ name: 'namekey', type: 'varchar', length: 100 })
  nameKey: string;
  @OneToMany(() => AppRouteEntity, (route) => route.parent)
  children: AppRouteEntity[];
  @ManyToOne(() => AppRouteEntity, (route) => route.children)
  parent: AppRouteEntity;
  @Column({ name: 'appparams', type: 'simple-json' })
  appParams: { [key: string]: string };
  @ManyToOne<ApplicationEntity>(() => ApplicationEntity, (app) => app.appRoutes)
  application: ApplicationEntity;
}

export const convertAppRouteToEntity = (appRoute: IAppRoute) => {
  return {
    appRouteId: appRoute.appRouteId,
    defaultName: appRoute.defaultName,
  } as AppRouteEntity;
};

export const convertEntityToAppRoute = (dto: AppRouteEntity) => {
  return {
    appRouteId: dto.appRouteId,
  } as IAppRoute;
};
