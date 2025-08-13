import {
	RecurlyCollectionMethod,
	RecurlyNetTermsType,
	RecurlyRevenueScheduleType,
	RecurlyAddOnSource,
	RecurlyRefundType,
	RecurlySubscriptionState,
	RecurlySubscriptionRampInterval,
	RecurlyCustomField,
} from './subscription.types'
import { Type } from 'class-transformer'
import {
	IsArray,
	IsBoolean,
	IsDateString,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	Max,
	ValidateNested,
	IsEmail,
} from 'class-validator'

// Base DTOs
export class RecurlyAccountCreateDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	code?: string

	@IsOptional()
	@IsEmail()
	@MaxLength(255)
	email?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	first_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	last_name?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	company?: string
}

export class RecurlySubscriptionShippingAddressDto {
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
}

export class RecurlySubscriptionShippingCreateDto {
	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlySubscriptionShippingAddressDto)
	address?: RecurlySubscriptionShippingAddressDto

	@IsOptional()
	@IsString()
	method_id?: string

	@IsOptional()
	@IsString()
	method_code?: string

	@IsOptional()
	@IsNumber()
	amount?: number
}

export class RecurlySubscriptionShippingUpdateDto {
	@IsOptional()
	@IsString()
	@MaxLength(13)
	object_id?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlySubscriptionShippingAddressDto)
	address?: RecurlySubscriptionShippingAddressDto

	@IsOptional()
	@IsString()
	method_id?: string

	@IsOptional()
	@IsString()
	method_code?: string
}

export class RecurlyCustomFieldDto implements RecurlyCustomField {
	@IsString()
	name!: string

	@IsString()
	value!: string
}

export class RecurlySubscriptionAddOnCreateDto {
	@IsString()
	@MaxLength(50)
	code!: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	id?: string

	@IsOptional()
	@IsEnum(['plan_add_on', 'item'] as RecurlyAddOnSource[])
	add_on_source?: RecurlyAddOnSource

	@IsOptional()
	@IsNumber()
	@Min(0)
	quantity?: number

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(1000000)
	unit_amount?: number

	@IsOptional()
	@IsString()
	unit_amount_decimal?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'] as RecurlyRevenueScheduleType[])
	revenue_schedule_type?: RecurlyRevenueScheduleType
}

export class RecurlySubscriptionRampIntervalDto implements RecurlySubscriptionRampInterval {
	@IsNumber()
	@Min(1)
	starting_billing_cycle!: number

	@IsNumber()
	@Min(0)
	unit_amount!: number
}

// List Subscriptions Query DTO
export class RecurlyListSubscriptionsQueryDto {
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
	@IsEnum(['active', 'canceled', 'expired', 'failed', 'future', 'paused'] as RecurlySubscriptionState[])
	state?: RecurlySubscriptionState
}

// List Account Subscriptions Query DTO
export class RecurlyListAccountSubscriptionsQueryDto extends RecurlyListSubscriptionsQueryDto {}

// Create Subscription DTO
export class RecurlyCreateSubscriptionDto {
	@IsOptional()
	@IsString()
	@MaxLength(50)
	plan_code?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	plan_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	business_entity_id?: string

	@IsOptional()
	@IsString()
	business_entity_code?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlyAccountCreateDto)
	account?: RecurlyAccountCreateDto

	@IsOptional()
	@IsString()
	price_segment_id?: string

	@IsOptional()
	@IsString()
	@MaxLength(13)
	billing_info_id?: string

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlySubscriptionShippingCreateDto)
	shipping?: RecurlySubscriptionShippingCreateDto

	@IsOptional()
	@IsEnum(['automatic', 'manual'] as RecurlyCollectionMethod[])
	collection_method?: RecurlyCollectionMethod

	@IsString()
	@MaxLength(3)
	currency!: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	@Max(1000000)
	unit_amount?: number

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean

	@IsOptional()
	@IsNumber()
	@Min(0)
	quantity?: number

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlySubscriptionAddOnCreateDto)
	add_ons?: RecurlySubscriptionAddOnCreateDto[]

	@IsOptional()
	@IsArray()
	@IsString({ each: true })
	coupon_codes?: string[]

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsDateString()
	trial_ends_at?: string

	@IsOptional()
	@IsDateString()
	starts_at?: string

	@IsOptional()
	@IsDateString()
	next_bill_date?: string

	@IsOptional()
	@IsNumber()
	@Min(1)
	total_billing_cycles?: number

	@IsOptional()
	@IsNumber()
	renewal_billing_cycles?: number

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlySubscriptionRampIntervalDto)
	ramp_intervals?: RecurlySubscriptionRampIntervalDto[]

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'] as RecurlyRevenueScheduleType[])
	revenue_schedule_type?: RecurlyRevenueScheduleType

	@IsOptional()
	@IsString()
	terms_and_conditions?: string

	@IsOptional()
	@IsString()
	customer_notes?: string

	@IsOptional()
	@IsString()
	credit_customer_notes?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	po_number?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	net_terms?: number

	@IsOptional()
	@IsEnum(['net', 'eom'] as RecurlyNetTermsType[])
	net_terms_type?: RecurlyNetTermsType

	@IsOptional()
	@IsString()
	@MaxLength(13)
	gateway_code?: string

	@IsOptional()
	@IsString()
	transaction_type?: string
}

// Update Subscription DTO
export class RecurlyUpdateSubscriptionDto {
	@IsOptional()
	@IsEnum(['automatic', 'manual'] as RecurlyCollectionMethod[])
	collection_method?: RecurlyCollectionMethod

	@IsOptional()
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => RecurlyCustomFieldDto)
	custom_fields?: RecurlyCustomFieldDto[]

	@IsOptional()
	@IsNumber()
	remaining_billing_cycles?: number

	@IsOptional()
	@IsNumber()
	renewal_billing_cycles?: number

	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean

	@IsOptional()
	@IsDateString()
	next_bill_date?: string

	@IsOptional()
	@IsEnum(['at_range_end', 'at_range_start', 'evenly', 'never'] as RecurlyRevenueScheduleType[])
	revenue_schedule_type?: RecurlyRevenueScheduleType

	@IsOptional()
	@IsString()
	terms_and_conditions?: string

	@IsOptional()
	@IsString()
	customer_notes?: string

	@IsOptional()
	@IsString()
	@MaxLength(50)
	po_number?: string

	@IsOptional()
	@IsString()
	price_segment_id?: string

	@IsOptional()
	@IsNumber()
	@Min(0)
	net_terms?: number

	@IsOptional()
	@IsEnum(['net', 'eom'] as RecurlyNetTermsType[])
	net_terms_type?: RecurlyNetTermsType

	@IsOptional()
	@IsString()
	@MaxLength(13)
	gateway_code?: string

	@IsOptional()
	@IsBoolean()
	tax_inclusive?: boolean

	@IsOptional()
	@ValidateNested()
	@Type(() => RecurlySubscriptionShippingUpdateDto)
	shipping?: RecurlySubscriptionShippingUpdateDto

	@IsOptional()
	@IsString()
	@MaxLength(13)
	billing_info_id?: string
}

// Terminate Subscription Query DTO
export class RecurlyTerminateSubscriptionQueryDto {
	@IsOptional()
	@IsEnum(['full', 'none', 'partial'] as RecurlyRefundType[])
	refund?: RecurlyRefundType

	@IsOptional()
	@IsBoolean()
	charge?: boolean
}

// Cancel Subscription Body DTO
export class RecurlyCancelSubscriptionDto {
	@IsOptional()
	@IsDateString()
	timeframe?: string
}

// Pause Subscription Body DTO
export class RecurlyPauseSubscriptionDto {
	@IsNumber()
	@Min(1)
	remaining_pause_cycles!: number
}

// Convert Trial Body DTO
export class RecurlyConvertTrialDto {
	@IsOptional()
	@IsBoolean()
	auto_renew?: boolean
}
