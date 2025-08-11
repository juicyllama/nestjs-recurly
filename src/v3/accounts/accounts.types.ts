// Enums
export type AccountState = 'active' | 'closed' | 'subscriber'

export type PreferredLocale =
	| 'da-DK'
	| 'de-CH'
	| 'de-DE'
	| 'en-AU'
	| 'en-CA'
	| 'en-GB'
	| 'en-IE'
	| 'en-NZ'
	| 'en-US'
	| 'es-ES'
	| 'es-MX'
	| 'es-US'
	| 'fi-FI'
	| 'fr-BE'
	| 'fr-CA'
	| 'fr-CH'
	| 'fr-FR'
	| 'hi-IN'
	| 'it-IT'
	| 'ja-JP'
	| 'ko-KR'
	| 'nl-BE'
	| 'nl-NL'
	| 'pl-PL'
	| 'pt-BR'
	| 'pt-PT'
	| 'ro-RO'
	| 'ru-RU'
	| 'sk-SK'
	| 'sv-SE'
	| 'tr-TR'
	| 'zh-CN'

export type BillTo = 'parent' | 'self'

export type TransactionType = 'moto'

export type TaxIdentifierType = 'cpf' | 'other'

export type ExternalHppType = 'adyen'

export type OnlineBankingPaymentType = 'ideal'

export type CardType = 'American Express' | 'Visa' | 'MasterCard' | 'Discover' | 'other'

export type CardNetworkPreference = 'Bancontact' | 'other'

export type BankAccountType = 'bacs' | 'checking' | 'savings'

export type AcquisitionChannel = 'advertising' | 'social_media' | 'email' | 'blog' | 'other'

// Address interface
export interface Address {
	phone?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	geo_code?: string
}

// Custom Field interface
export interface CustomField {
	name: string
	value: string | null
}

// Account Acquisition interface
export interface AccountAcquisition {
	cost?: {
		amount?: number
		currency?: string
	}
	channel?: AcquisitionChannel
	subchannel?: string
	campaign?: string
	acquired_at?: string // ISO 8601 date-time
}

// External Account interface
export interface ExternalAccount {
	external_account_code?: string
	external_connection_type?: string
}

// Shipping Address interface
export interface ShippingAddress {
	id?: string
	object?: string
	account_id?: string
	nickname?: string
	first_name?: string
	last_name?: string
	company?: string
	phone?: string
	email?: string
	vat_number?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	geo_code?: string
	created_at?: string
	updated_at?: string
}

// Payment Method interface
export interface PaymentMethod {
	object?: string
	card_type?: CardType
	first_six?: string
	last_four?: string
	exp_month?: number
	exp_year?: number
	gateway_token?: string
	gateway_code?: string
	billing_agreement_id?: string
	name_on_account?: string
	account_type?: BankAccountType
	routing_number?: string
	routing_number_bank?: string
	cc_bin_country?: string
}

// Fraud info interface
export interface FraudInfo {
	score?: number
	decision?: string
	reference?: string
	risk_rules_triggered?: any[]
}

// Payment Gateway Reference interface
export interface PaymentGatewayReference {
	id?: string
	object?: string
	reference?: string
	reference_type?: string
}

// Gateway Attributes interface
export interface GatewayAttributes {
	[key: string]: any
}

// Billing Info interface
export interface BillingInfo {
	id?: string
	object?: string
	account_id?: string
	first_name?: string
	last_name?: string
	company?: string
	address?: Address
	vat_number?: string
	valid?: boolean
	payment_method?: PaymentMethod
	fraud?: FraudInfo
	primary_payment_method?: boolean
	backup_payment_method?: boolean
	payment_gateway_references?: PaymentGatewayReference[]
	created_at?: string
	updated_at?: string
	updated_by?: {
		ip?: string
		country?: string
	}
}

// Main Account interface
export interface RecurlyAccount {
	id?: string
	object?: string
	state?: AccountState
	hosted_login_token?: string
	shipping_addresses?: ShippingAddress[]
	has_live_subscription?: boolean
	has_active_subscription?: boolean
	has_future_subscription?: boolean
	has_canceled_subscription?: boolean
	has_paused_subscription?: boolean
	has_past_due_invoice?: boolean
	created_at?: string
	updated_at?: string
	deleted_at?: string
	code?: string
	username?: string
	email?: string
	override_business_entity_id?: string
	preferred_locale?: PreferredLocale
	preferred_time_zone?: string
	cc_emails?: string
	first_name?: string
	last_name?: string
	company?: string
	vat_number?: string
	tax_exempt?: boolean
	exemption_certificate?: string
	external_accounts?: ExternalAccount[]
	parent_account_id?: string
	bill_to?: BillTo
	dunning_campaign_id?: string
	invoice_template_id?: string
	address?: Address
	billing_info?: BillingInfo
	custom_fields?: CustomField[]
	entity_use_code?: string
}

// Account Balance interfaces
export interface AccountBalanceAmount {
	currency?: string
	amount?: number
}

export interface AccountBalanceInfo {
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

export interface AccountBalance {
	object?: string
	account?: AccountBalanceInfo
	past_due?: boolean
	balances?: AccountBalanceAmount[]
}

// List response interfaces
export interface AccountListResponse {
	object: string
	has_more: boolean
	next?: string
	data: RecurlyAccount[]
}

export interface AccountBalanceListResponse {
	object: string
	has_more: boolean
	next?: string
	data: AccountBalance[]
}

// External Subscription interface
export interface ExternalSubscription {
	id?: string
	object?: string
	account?: {
		id?: string
		object?: string
		code?: string
	}
	external_subscription_id?: string
	external_product_reference?: {
		id?: string
		object?: string
		reference_code?: string
		external_connection_type?: string
	}
	last_purchased?: string
	auto_renew?: boolean
	in_grace_period?: boolean
	app_identifier?: string
	quantity?: number
	external_id?: string
	activated_at?: string
	canceled_at?: string
	expires_at?: string
	created_at?: string
	updated_at?: string
	trial_started_at?: string
	trial_ends_at?: string
	imported_trial?: boolean
	state?: string
}

export interface ExternalSubscriptionListResponse {
	object: string
	has_more: boolean
	next?: string
	data: ExternalSubscription[]
}
