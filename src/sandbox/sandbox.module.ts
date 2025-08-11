import { AccountsModule } from '../v3/accounts/accounts.module'
import { RecurlyV3Module } from '../v3/v3.module'
import { SandboxController } from './sandbox.controller'
import { SandboxService } from './sandbox.service'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [ConfigModule.forRoot(), RecurlyV3Module, AccountsModule],
	controllers: [SandboxController],
	providers: [SandboxService],
	exports: [SandboxService],
})
export class SandboxModule {}
