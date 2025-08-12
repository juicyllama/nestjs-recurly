// Account Acquisition Types
export interface RecurlyAccountAcquisition {
	id?: string
	object?: string
	account?: RecurlyAccountMini
	cost?: RecurlyAccountAcquisitionCost
	channel?: RecurlyAccountAcquisitionChannel
	subchannel?: string
	campaign?: string
	acquired_at?: string
	created_at?: string
	updated_at?: string
}

export interface RecurlyAccountAcquisitionCost {
	currency?: string
	amount?: number
}

export enum RecurlyAccountAcquisitionChannel {
	ADVERTISING = 'advertising',
	BLOG = 'blog',
	DIRECT_TRAFFIC = 'direct_traffic',
	EMAIL = 'email',
	EVENTS = 'events',
	MARKETING_CONTENT = 'marketing_content',
	ORGANIC_SEARCH = 'organic_search',
	OTHER = 'other',
	OUTBOUND_SALES = 'outbound_sales',
	PAID_SEARCH = 'paid_search',
	PUBLIC_RELATIONS = 'public_relations',
	REFERRAL = 'referral',
	SOCIAL_MEDIA = 'social_media',
}

export interface RecurlyAccountMini {
	id?: string
	object?: string
	code?: string
	email?: string
	first_name?: string
	last_name?: string
}

export interface RecurlyAccountAcquisitionListResponse {
	object?: string
	has_more?: boolean
	next?: string
	data?: RecurlyAccountAcquisition[]
}
