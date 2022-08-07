import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { FooController } from './foo.controller'
import { FooV2Controller } from './foo-v2.controller'

@Module({
  imports: [],
  controllers: [AppController, FooController, FooV2Controller],
  providers: [AppService],
})
export class AppModule {}
