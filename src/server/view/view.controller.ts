import { Controller, Get, Res, Req } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { parse } from 'url';

import { ViewService } from './view.service';

@Controller('/')
@ApiExcludeController()
export class ViewController {
  constructor(private viewService: ViewService) {}

  async handler(req: Request, res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }

  @Get('index')
  public async index(@Req() req: Request, @Res() res: Response) {
    debugger;
    const parsedUrl = parse(req.url, true);
    const serverSideProps = {
      from: 'Nest',
      to: 'Next',
    };

    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @Get('apps')
  public async getApplist(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Get('app/:id')
  public async getApp(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }
}
