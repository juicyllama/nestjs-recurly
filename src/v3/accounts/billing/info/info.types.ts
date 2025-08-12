// Enums
export type RecurlyPaymentMethodObject = 'bacs' | 'becs' | 'credit_card' | 'paypal' | 'bank_account' | 'amazon' | 'roku'

export type RecurlyCardType =
	| 'American Express'
	| 'Dankort'
	| 'Diners Club'
	| 'Discover'
	| 'ELO'
	| 'Forbrugsforeningen'
	| 'Hipercard'
	| 'JCB'
	| 'Laser'
	| 'Maestro'
	| 'MasterCard'
	| 'Test Card'
	| 'Union Pay'
	| 'Unknown'
	| 'Visa'
	| 'Tarjeta Naranja'

export type RecurlyFundingSource = 'credit' | 'debit' | 'prepaid' | 'unknown'

export type RecurlyCardNetworkPreference = 'Bancontact' | 'CartesBancaires' | 'Dankort' | 'MasterCard' | 'Visa'

export type RecurlyAccountType = 'checking' | 'savings'

export type RecurlyFraudDecision = 'approve' | 'review' | 'decline' | 'escalate'

export type RecurlyBillingTransactionType = 'moto'

export type RecurlyTaxIdentifierType = 'cpf' | 'cnpj' | 'cuit'

export type RecurlyExternalHppType = 'adyen'

export type RecurlyOnlineBankingPaymentType = 'ideal' | 'sofort'

export type RecurlyBankAccountPaymentType = 'bacs' | 'becs'

// Interfaces
export interface RecurlyAddress {
	phone?: string
	street1?: string
	street2?: string
	city?: string
	region?: string
	postal_code?: string
	country?: string
	geo_code?: string
}

export interface RecurlyPaymentMethod {
	object?: RecurlyPaymentMethodObject
	card_type?: RecurlyCardType
	first_six?: string
	last_four?: string
	last_two?: string
	exp_month?: number
	exp_year?: number
	gateway_token?: string
	cc_bin_country?: string
	funding_source?: RecurlyFundingSource
	gateway_code?: string
	gateway_attributes?: RecurlyGatewayAttributes
	card_network_preference?: RecurlyCardNetworkPreference
	billing_agreement_id?: string
	name_on_account?: string
	account_type?: RecurlyAccountType
	routing_number?: string
	routing_number_bank?: string
	username?: string
}

export interface RecurlyGatewayAttributes {
	account_reference?: string
	[key: string]: any
}

export interface RecurlyFraudInfo {
	score?: number
	decision?: RecurlyFraudDecision
	risk_rules_triggered?: Record<string, any>
}

export interface RecurlyPaymentGatewayReference {
	id?: string
	object?: string
	reference?: string
	reference_type?: string
}

export interface RecurlyUpdatedBy {
	ip?: string
	country?: string
}

export interface RecurlyBillingInfo {
	id?: string
	object?: string
	account_id?: string
	first_name?: string
	last_name?: string
	company?: string
	address?: RecurlyAddress
	vat_number?: string
	valid?: boolean
	payment_method?: RecurlyPaymentMethod
	fraud?: RecurlyFraudInfo
	primary_payment_method?: boolean
	backup_payment_method?: boolean
	payment_gateway_references?: RecurlyPaymentGatewayReference[]
	created_at?: string
	updated_at?: string
	updated_by?: RecurlyUpdatedBy
}

// Transaction verification response types
export interface RecurlyTransactionAccount {
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

export interface RecurlyTransactionInvoice {
	id?: string
	object?: string
	number?: string
	business_entity_id?: string
	type?: 'charge' | 'credit' | 'legacy' | 'non_recurring' | 'renewal'
	state?: 'all' | 'pending' | 'processing' | 'past_due' | 'paid' | 'failed' | 'voided'
}

export interface RecurlyPaymentGateway {
	id?: string
	object?: string
	type?: string
	name?: string
}

export interface RecurlyTransactionFraudInfo {
	object?: string
	score?: number
	decision?: RecurlyFraudDecision
	reference?: string
	risk_rules_triggered?: Array<{
		code?: string
		message?: string
	}>
}

export type RecurlyTransactionType = 'authorization' | 'capture' | 'payment' | 'purchase' | 'refund' | 'verify' | 'void'
export type RecurlyTransactionOrigin =
	| 'api'
	| 'hpp'
	| 'merchant'
	| 'recurly_admin'
	| 'recurly_support'
	| 'recurring'
	| 'transparent'
	| 'unified'
	| 'wizard'
export type RecurlyTransactionStatus =
	| 'chargeback'
	| 'declined'
	| 'error'
	| 'pending'
	| 'processing'
	| 'scheduled'
	| 'success'
	| 'void'
	| 'voided'
export type RecurlyTransactionInitiator = 'customer' | 'merchant'
export type RecurlyMerchantReasonCode =
	| 'none'
	| 'duplicate'
	| 'fraud'
	| 'general'
	| 'no_authorization'
	| 'non_sufficient_funds'
	| 'not_as_described_or_defective'
	| 'not_received'
	| 'credit_not_processed'
	| 'customer_request'
	| 'partial'
export type RecurlyCollectionMethod = 'automatic' | 'manual'
export type RecurlyCvvCheck = 'D' | 'I' | 'M' | 'N' | 'P' | 'S' | 'U' | 'X' | 'Y' | '$'
export type RecurlyAvsCheck =
	| 'A'
	| 'B'
	| 'C'
	| 'D'
	| 'E'
	| 'F'
	| 'G'
	| 'I'
	| 'K'
	| 'L'
	| 'M'
	| 'N'
	| 'O'
	| 'P'
	| 'R'
	| 'S'
	| 'U'
	| 'W'
	| 'X'
	| 'Y'
	| 'Z'

export interface RecurlyTransaction {
	id?: string
	object?: string
	uuid?: string
	original_transaction_id?: string
	account?: RecurlyTransactionAccount
	initiator?: RecurlyTransactionInitiator
	invoice?: RecurlyTransactionInvoice
	merchant_reason_code?: RecurlyMerchantReasonCode
	voided_by_invoice?: RecurlyTransactionInvoice
	subscription_ids?: string[]
	type?: RecurlyTransactionType
	origin?: RecurlyTransactionOrigin
	currency?: string
	amount?: number
	status?: RecurlyTransactionStatus
	success?: boolean
	backup_payment_method_used?: boolean
	refunded?: boolean
	billing_address?: RecurlyAddress
	collection_method?: RecurlyCollectionMethod
	payment_method?: RecurlyPaymentMethod
	ip_address_v4?: string
	ip_address_country?: string
	status_code?: string
	status_message?: string
	customer_message?: string
	customer_message_locale?: string
	payment_gateway?: RecurlyPaymentGateway
	gateway_message?: string
	gateway_reference?: string
	gateway_approval_code?: string
	gateway_response_code?: string
	gateway_response_time?: number
	gateway_response_values?: Record<string, any>
	cvv_check?: RecurlyCvvCheck
	avs_check?: RecurlyAvsCheck
	created_at?: string
	updated_at?: string
	voided_at?: string
	collected_at?: string
	action_result?: Record<string, any>
	vat_number?: string
	fraud_info?: RecurlyTransactionFraudInfo
}

// Error response type
export interface RecurlyError {
	type?: string
	message?: string
	params?: Array<{
		param?: string
		message?: string
	}>
}
