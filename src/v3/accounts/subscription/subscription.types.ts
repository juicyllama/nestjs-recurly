// Enums
export type RecurlySubscriptionState = 'active' | 'canceled' | 'expired' | 'failed' | 'future' | 'paused'

export type RecurlyRevenueScheduleType = 'at_range_end' | 'at_range_start' | 'evenly' | 'never'

export type RecurlyCollectionMethod = 'automatic' | 'manual'

export type RecurlyNetTermsType = 'net' | 'eom'

export type RecurlyAddOnSource = 'plan_add_on' | 'item'

export type RecurlyRefundType = 'full' | 'none' | 'partial'

// Interfaces
export interface RecurlyAccountMini {
	id?: string
	object?: string
	code?: string
	email?: string
	first_name?: string
	last_name?: string
	company?: string
	parent_account_id?: string
	bill_to?: string
	dunning_campaign_id?: string
}

export interface RecurlyPlanMini {
	id?: string
	object?: string
	code?: string
	name?: string
	interval?: string
	interval_unit?: string
	interval_length?: number
}

export interface RecurlyAddOnMini {
	id?: string
	object?: string
	code?: string
	name?: string
	add_on_type?: string
	usage_type?: string
	usage_percentage?: number
	measured_unit_id?: string
	item_id?: string
	external_sku?: string
	accounting_code?: string
}

export interface RecurlyCouponRedemptionMini {
	id?: string
	object?: string
	coupon?: {
		id?: string
		object?: string
		code?: string
		name?: string
		state?: string
		discount?: any
		coupon_type?: string
		expired_at?: string
	}
	state?: string
	currency?: string
	discounted?: number
	created_at?: string
}

export interface RecurlySubscriptionShipping {
	object?: string
	address?: {
		phone?: string
		street1?: string
		street2?: string
		city?: string
		region?: string
		postal_code?: string
		country?: string
		geo_code?: string
	}
	method?: {
		id?: string
		object?: string
		code?: string
		name?: string
		accounting_code?: string
		tax_code?: string
	}
	amount?: number
}

export interface RecurlySubscriptionChange {
	id?: string
	object?: string
	subscription_id?: string
	plan?: RecurlyPlanMini
	add_ons?: RecurlySubscriptionAddOn[]
	unit_amount?: number
	quantity?: number
	shipping?: RecurlySubscriptionShipping
	activate_at?: string
	activated?: boolean
	revenue_schedule_type?: RecurlyRevenueScheduleType
	custom_fields?: RecurlyCustomField[]
	created_at?: string
	updated_at?: string
	deleted_at?: string
}

export interface RecurlySubscriptionRampInterval {
	starting_billing_cycle?: number
	unit_amount?: number
}

export interface RecurlySubscriptionRampIntervalResponse extends RecurlySubscriptionRampInterval {
	remaining_billing_cycles?: number
}

export interface RecurlyTaxInfo {
	type?: string
	region?: string
	rate?: number
	tax_details?: Array<{
		type?: string
		region?: string
		rate?: number
		tax?: number
		name?: string
		level?: string
		billable?: boolean
	}>
}

export interface RecurlyCustomField {
	name?: string
	value?: string
}

export interface RecurlySubscriptionAddOn {
	id?: string
	object?: string
	subscription_id?: string
	add_on?: RecurlyAddOnMini
	add_on_source?: RecurlyAddOnSource
	quantity?: number
	unit_amount?: number
	unit_amount_decimal?: string
	revenue_schedule_type?: RecurlyRevenueScheduleType
	tier_type?: string
	tiers?: Array<{
		starting_quantity?: number
		ending_quantity?: number
		unit_amount?: number
		unit_amount_decimal?: string
	}>
	expired_at?: string
	created_at?: string
	updated_at?: string
}

export interface RecurlySubscription {
	id?: string
	object?: string
	uuid?: string
	account?: RecurlyAccountMini
	plan?: RecurlyPlanMini
	state?: RecurlySubscriptionState
	shipping?: RecurlySubscriptionShipping
	coupon_redemptions?: RecurlyCouponRedemptionMini[]
	pending_change?: RecurlySubscriptionChange
	current_period_started_at?: string
	current_period_ends_at?: string
	current_term_started_at?: string
	current_term_ends_at?: string
	trial_started_at?: string
	trial_ends_at?: string
	remaining_billing_cycles?: number
	total_billing_cycles?: number
	renewal_billing_cycles?: number
	auto_renew?: boolean
	ramp_intervals?: RecurlySubscriptionRampIntervalResponse[]
	paused_at?: string
	remaining_pause_cycles?: number
	currency?: string
	revenue_schedule_type?: RecurlyRevenueScheduleType
	unit_amount?: number
	tax_inclusive?: boolean
	quantity?: number
	add_ons?: RecurlySubscriptionAddOn[]
	add_ons_total?: number
	subtotal?: number
	tax?: number
	tax_info?: RecurlyTaxInfo
	price_segment_id?: string
	total?: number
	collection_method?: RecurlyCollectionMethod
	po_number?: string
	net_terms?: number
	net_terms_type?: RecurlyNetTermsType
	terms_and_conditions?: string
	customer_notes?: string
	expiration_reason?: string
	custom_fields?: RecurlyCustomField[]
	created_at?: string
	updated_at?: string
	activated_at?: string
	canceled_at?: string
	expires_at?: string
	bank_account_authorized_at?: string
	gateway_code?: string
	billing_info_id?: string
	active_invoice_id?: string
	business_entity_id?: string
	started_with_gift?: boolean
	converted_at?: string
	action_result?: any
}

export interface RecurlySubscriptionList {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlySubscription[]
}

// Error response with transaction
export interface RecurlyErrorMayHaveTransaction {
	error?: {
		type?: string
		message?: string
		params?: Array<{
			param?: string
			message?: string
		}>
		transaction_error?: {
			object?: string
			transaction_id?: string
			category?: string
			code?: string
			message?: string
			merchant_advice?: string
			customer_message?: string
			gateway_error_code?: string
			three_d_secure_action_token_id?: string
		}
	}
}
