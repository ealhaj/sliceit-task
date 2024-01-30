import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('info')
  async info() {
    return {
      success: true,
      data: {
        info: 'Some information about the <b>company</b>.',
      },
    };
  }
}
