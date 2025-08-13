import { RecurlySubscriptionService } from './subscription.service'
import { Module } from '@nestjs/common'
import { RecurlyConfigDto } from '../../../config/config.dto'
import { ConfigValidationModule } from '../../../config/config.module'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [RecurlySubscriptionService],
	exports: [RecurlySubscriptionService],
})
export class RecurlySubscriptionModule {}
