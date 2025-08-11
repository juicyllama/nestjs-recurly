import { RecurlyConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { AccountsModule } from './accounts/accounts.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto), AccountsModule],
})
export class RecurlyV3Module {}
