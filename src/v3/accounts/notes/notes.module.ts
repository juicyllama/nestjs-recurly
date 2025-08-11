import { Module } from '@nestjs/common'
import { AccountNotesService } from './notes.service'
import { ConfigValidationModule } from '../../../config/config.module'
import { RecurlyConfigDto } from '../../../config/config.dto'

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [AccountNotesService],
	exports: [AccountNotesService],
})
export class AccountNotesModule {}
