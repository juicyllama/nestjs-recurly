import { RecurlyConfigDto } from '../config/config.dto'
import { ConfigValidationModule } from '../config/config.module'
import { AccountsModule } from './accounts/accounts.module'
import { ItemModule } from './item/item.module'
import { PlanModule } from './plan/plan.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto), AccountsModule, ItemModule, PlanModule],
})
export class RecurlyV3Module {}
