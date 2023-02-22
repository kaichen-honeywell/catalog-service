import { IAppData } from '../../../pojo';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AppRouteEntity } from './route.entity';

@Entity({ name: 'applications' })
export class ApplicationEntity {
  @PrimaryGeneratedColumn('uuid')
  appId: string; // UUID of app
  @Column({
    name: 'defaultname',
    length: 250,
    nullable: false,
  })
  defaultName: string; //name of app
  @Column({ name: 'namekey', length: 50 })
  nameKey: string; // name key for i18n;
  @Column({ name: 'iconname', length: 50, nullable: true })
  iconName: string;
  @Column({ name: 'description', length: 1024, nullable: true })
  description?: string; // description
  @Column({ name: 'rooturl', length: 2048, nullable: false })
  rootUrl: string; // root url of app
  @Column({ name: 'appentryurl', length: 2048, nullable: true })
  appEntryUrl: string; // entry url for microfront
  @Column({ name: 'version', length: 100, nullable: true })
  version: string; // target version of app
  @Column({ name: 'releasedate', length: 100, nullable: false })
  releaseDate: string; // YYYY-MM-DDTHH:mm:ss.sssZ
  @OneToMany<AppRouteEntity>(
    () => AppRouteEntity,
    (approute) => approute.application,
  )
  appRoutes: AppRouteEntity[];
  @Column({ name: 'appparam', type: 'simple-json' })
  appParams: { [key: string]: string }; // a k
}

export const convertDtoToAppData = (dto: ApplicationEntity) => {
  return {
    appId: dto.appId,
  } as IAppData;
};
