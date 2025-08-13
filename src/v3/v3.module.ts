import { RecurlyConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { AccountsModule } from './accounts/accounts.module'
import { ItemModule } from './item/item.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto), AccountsModule, ItemModule],
})
export class RecurlyV3Module {}
