import { Controller, Get } from '@nestjs/common'

@Controller('bar')
export class BarController {
  @Get()
  getFoo(): string {
    return 'Bar controller called.'
  }
}
