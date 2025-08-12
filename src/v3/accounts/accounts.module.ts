import { RecurlyConfigDto } from '../../config/config.dto'
import { ConfigValidationModule } from '../../config/config.module'
import { AccountsService } from './accounts.service'
import { AccountAcquisitionModule } from './acquisition/acquisition.module'
import { AccountNotesModule } from './notes/notes.module'
import { Module } from '@nestjs/common'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto), AccountNotesModule, AccountAcquisitionModule],
	controllers: [],
	providers: [AccountsService],
	exports: [AccountsService],
})
export class AccountsModule {}
