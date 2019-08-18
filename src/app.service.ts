import { Injectable } from '@nestjs/common';
import { version } from 'pjson';

@Injectable()
export class AppService {
  getVersion(): string {
    return `Milocredit backend challenge v${version}`;
  }
}