import { IsOptional, IsString } from 'class-validator'

export class RecurlyConfigDto {
	@IsOptional()
	@IsString()
	RECURLY_API_KEY?: string

	@IsOptional()
	@IsString()
	RECURLY_ACCEPT_LANGUAGE?: string
}
