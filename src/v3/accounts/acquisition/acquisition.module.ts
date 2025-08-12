import { Module } from '@nestjs/common'
import { AccountAcquisitionService } from './acquisition.service'
import { ConfigValidationModule } from '../../../config/config.module'
import { RecurlyConfigDto } from '../../../config/config.dto'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [AccountAcquisitionService],
	exports: [AccountAcquisitionService],
})
export class AccountAcquisitionModule {}
