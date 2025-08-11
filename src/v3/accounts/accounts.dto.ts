import {
	RecurlyAccount,
	AccountListResponse,
	AccountBalance,
	ExternalSubscriptionListResponse,
	PreferredLocale,
	BillTo,
	TransactionType,
} from './accounts.types'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsOptional,
	IsString,
	IsEmail,
	IsEnum,
	IsNumber,
	ValidateNested,
	IsDateString,
	MaxLength,
} from 'class-validator'

// List Accounts Query DTO
export class ListAccountsQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	@IsOptional()
	@IsNumber()
	limit?: number

	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'

	@IsOptional()
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'

	@IsOptional()
	@IsDateString()
	begin_time?: string

	@IsOptional()
	@IsDateString()
	end_time?: string

	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsBoolean()
	subscriber?: boolean

	@IsOptional()
	@IsEnum(['true'])
	past_due?: 'true'
}

// Address DTO
export class AddressDto {
	@IsOptional()
	@IsString()
	phone?: string

	@IsOptional()
	@IsString()
	street1?: string

	@IsOptional()
	@IsString()
	street2?: string

	@IsOptional()
	@IsString()
	city?: string

	@IsOptional()
	@IsString()
	region?: string

	@IsOptional()
	@IsString()
	postal_code?: string

	@IsOptional()
	@IsString()
	country?: string

	@IsOptional()
	@IsString()
	geo_code?: string
}

// Custom Field DTO
export class CustomFieldDto {
	@IsString()
	name!: string

	@IsOptional()
	@IsString()
	value?: string | null
}

// Account Acquisition DTO
export class AccountAcquisitionDto {
	@IsOptional()
	@ValidateNested()
	@Type(() => Object)
	cost?: {
		amount?: number
		currency?: string
	}

	@IsOptional()
	@IsString()
	channel?: string

	@IsOptional()
	@IsString()
	subchannel?: string

	@IsOptional()
	@IsString()
	campaign?: string

	@IsOptional()
	@IsDateString()
	acquired_at?: string
}

// External Account DTO
export class ExternalAccountDto {
	@IsOptional()
	@IsString()
	external_account_code?: string

	@IsOptional()
	@IsString()
	external_connection_type?: string
}

// Shipping Address DTO
export class ShippingAddressDto {
	@IsOptional()
	@IsString()
	nickname?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	first_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	last_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(100)
	company?: string

	@IsOptional()
	@IsString()
	phone?: string

	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	vat_number?: string

	@IsOptional()
	@IsString()
	street1?: string

	@IsOptional()
	@IsString()
	street2?: string

	@IsOptional()
	@IsString()
	city?: string

	@IsOptional()
	@IsString()
	region?: string

	@IsOptional()
	@IsString()
	postal_code?: string

	@IsOptional()
	@IsString()
	country?: string

	@IsOptional()
	@IsString()
	geo_code?: string
}

// Billing Info Create DTO
export class BillingInfoCreateDto {
	@IsOptional()
	@IsString()
	token_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	first_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	last_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(100)
	company?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => AddressDto)
	address?: AddressDto

	@IsOptional()
	@IsString()
	number?: string

	@IsOptional()
	@IsString()
	month?: string

	@IsOptional()
	@IsString()
	year?: string

	@IsOptional()
	@IsString()
	cvv?: string

	@IsOptional()
	@IsString()
	currency?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	vat_number?: string

	@IsOptional()
	@IsString()
	ip_address?: string

	@IsOptional()
	@IsString()
	gateway_token?: string

	@IsOptional()
	@IsString()
	gateway_code?: string

	@IsOptional()
	@IsBoolean()
	primary_payment_method?: boolean

	@IsOptional()
	@IsBoolean()
	backup_payment_method?: boolean

	@IsOptional()
	@IsEnum(['moto'])
	transaction_type?: TransactionType

	@IsOptional()
	@IsString()
	iban?: string

	@IsOptional()
	@IsString()
	name_on_account?: string

	@IsOptional()
	@IsString()
	account_number?: string

	@IsOptional()
	@IsString()
	routing_number?: string

	@IsOptional()
	@IsString()
	sort_code?: string

	@IsOptional()
	@IsEnum(['bacs'])
	type?: string

	@IsOptional()
	@IsEnum(['checking', 'savings'])
	account_type?: string

	@IsOptional()
	@IsString()
	tax_identifier?: string

	@IsOptional()
	@IsEnum(['cpf'])
	tax_identifier_type?: string
}

// Create Account DTO
export class CreateAccountDto {
	@IsString()
	@MaxLength(50)
	code!: string

	@IsOptional()
	@ValidateNested()
	@Type(() => AccountAcquisitionDto)
	acquisition?: AccountAcquisitionDto

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ExternalAccountDto)
	external_accounts?: ExternalAccountDto[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => ShippingAddressDto)
	shipping_addresses?: ShippingAddressDto[]

	@IsOptional()
	@IsString()
	@MaxLength(255)
	username?: string

	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string

	@IsOptional()
	@IsEnum([
		'da-DK',
		'de-CH',
		'de-DE',
		'en-AU',
		'en-CA',
		'en-GB',
		'en-IE',
		'en-NZ',
		'en-US',
		'es-ES',
		'es-MX',
		'es-US',
		'fi-FI',
		'fr-BE',
		'fr-CA',
		'fr-CH',
		'fr-FR',
		'hi-IN',
		'it-IT',
		'ja-JP',
		'ko-KR',
		'nl-BE',
		'nl-NL',
		'pl-PL',
		'pt-BR',
		'pt-PT',
		'ro-RO',
		'ru-RU',
		'sk-SK',
		'sv-SE',
		'tr-TR',
		'zh-CN',
	])
	preferred_locale?: PreferredLocale

	@IsOptional()
	@IsString()
	preferred_time_zone?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	cc_emails?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	first_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	last_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(100)
	company?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	vat_number?: string

	@IsOptional()
	@IsBoolean()
	tax_exempt?: boolean

	@IsOptional()
	@IsString()
	@MaxLength(30)
	exemption_certificate?: string

	@IsOptional()
	@IsString()
	override_business_entity_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	parent_account_code?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	parent_account_id?: string

	@IsOptional()
	@IsEnum(['parent', 'self'])
	bill_to?: BillTo

	@IsOptional()
	@IsEnum(['moto'])
	transaction_type?: TransactionType

	@IsOptional()
	@IsString()
	dunning_campaign_id?: string

	@IsOptional()
	@IsString()
	invoice_template_id?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => AddressDto)
	address?: AddressDto

	@IsOptional()
	@ValidateNested()
	@Type(() => BillingInfoCreateDto)
	billing_info?: BillingInfoCreateDto

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CustomFieldDto)
	custom_fields?: CustomFieldDto[]

	@IsOptional()
	@IsString()
	entity_use_code?: string
}

// Update Account DTO
export class UpdateAccountDto {
	@IsOptional()
	@IsString()
	@MaxLength(255)
	username?: string

	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string

	@IsOptional()
	@IsEnum([
		'da-DK',
		'de-CH',
		'de-DE',
		'en-AU',
		'en-CA',
		'en-GB',
		'en-IE',
		'en-NZ',
		'en-US',
		'es-ES',
		'es-MX',
		'es-US',
		'fi-FI',
		'fr-BE',
		'fr-CA',
		'fr-CH',
		'fr-FR',
		'hi-IN',
		'it-IT',
		'ja-JP',
		'ko-KR',
		'nl-BE',
		'nl-NL',
		'pl-PL',
		'pt-BR',
		'pt-PT',
		'ro-RO',
		'ru-RU',
		'sk-SK',
		'sv-SE',
		'tr-TR',
		'zh-CN',
	])
	preferred_locale?: PreferredLocale

	@IsOptional()
	@IsString()
	preferred_time_zone?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	cc_emails?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	first_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(255)
	last_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(100)
	company?: string

	@IsOptional()
	@IsString()
	@MaxLength(20)
	vat_number?: string

	@IsOptional()
	@IsBoolean()
	tax_exempt?: boolean

	@IsOptional()
	@IsString()
	@MaxLength(30)
	exemption_certificate?: string

	@IsOptional()
	@IsString()
	override_business_entity_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	parent_account_code?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	parent_account_id?: string

	@IsOptional()
	@IsEnum(['parent', 'self'])
	bill_to?: BillTo

	@IsOptional()
	@IsEnum(['moto'])
	transaction_type?: TransactionType

	@IsOptional()
	@IsString()
	dunning_campaign_id?: string

	@IsOptional()
	@IsString()
	invoice_template_id?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => AddressDto)
	address?: AddressDto

	@IsOptional()
	@ValidateNested()
	@Type(() => BillingInfoCreateDto)
	billing_info?: BillingInfoCreateDto

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CustomFieldDto)
	custom_fields?: CustomFieldDto[]

	@IsOptional()
	@IsString()
	entity_use_code?: string
}

// Child Accounts Query DTO
export class ListChildAccountsQueryDto {
	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	ids?: string[]

	@IsOptional()
	@IsNumber()
	limit?: number

	@IsOptional()
	@IsEnum(['asc', 'desc'])
	order?: 'asc' | 'desc'

	@IsOptional()
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'

	@IsOptional()
	@IsDateString()
	begin_time?: string

	@IsOptional()
	@IsDateString()
	end_time?: string

	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsBoolean()
	subscriber?: boolean

	@IsOptional()
	@IsEnum(['true'])
	past_due?: 'true'
}

// External Subscriptions Query DTO
export class ListExternalSubscriptionsQueryDto {
	@IsOptional()
	@IsEnum(['created_at', 'updated_at'])
	sort?: 'created_at' | 'updated_at'
}

// Response DTOs
export class AccountsListResponseDto implements AccountListResponse {
	@IsString()
	object!: string

	@IsBoolean()
	has_more!: boolean

	@IsOptional()
	@IsString()
	next?: string

	@IsArray()
	data!: RecurlyAccount[]
}

export class AccountBalanceResponseDto implements AccountBalance {
	@IsOptional()
	@IsString()
	object?: string

	@IsOptional()
	account?: any

	@IsOptional()
	@IsBoolean()
	past_due?: boolean

	@IsOptional()
	@IsArray()
	balances?: any[]
}

export class ExternalSubscriptionsListResponseDto implements ExternalSubscriptionListResponse {
	@IsString()
	object!: string

	@IsBoolean()
	has_more!: boolean

	@IsOptional()
	@IsString()
	next?: string

	@IsArray()
	data!: any[]
}
