import { RecurlyConfigDto } from '../../../config/config.dto'
import { InjectConfig } from '../../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../../v3.helpers'
import {
	RecurlyListSubscriptionsQueryDto,
	RecurlyListAccountSubscriptionsQueryDto,
	RecurlyCreateSubscriptionDto,
	RecurlyUpdateSubscriptionDto,
	RecurlyTerminateSubscriptionQueryDto,
	RecurlyCancelSubscriptionDto,
	RecurlyPauseSubscriptionDto,
	RecurlyConvertTrialDto,
} from './subscription.dtos'
import { RecurlySubscription, RecurlySubscriptionList } from './subscription.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class RecurlySubscriptionService {
	private readonly logger = new Logger(RecurlySubscriptionService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	/**
	 * List all subscriptions
	 * @param query - Query parameters for filtering subscriptions
	 * @param apiKey - Optional API key for runtime override
	 * @returns List of subscriptions
	 */
	async listSubscriptions(
		query?: RecurlyListSubscriptionsQueryDto,
		apiKey?: string,
	): Promise<RecurlySubscriptionList> {
		const queryString = query ? buildQueryString(query) : ''
		const url = `${RECURLY_API_BASE_URL}/subscriptions${queryString ? '?' + queryString : ''}`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List subscriptions')
		return response.json() as Promise<RecurlySubscriptionList>
	}

	/**
	 * List subscriptions for a specific account
	 * @param accountId - The account ID
	 * @param query - Query parameters for filtering subscriptions
	 * @param apiKey - Optional API key for runtime override
	 * @returns List of account subscriptions
	 */
	async listAccountSubscriptions(
		accountId: string,
		query?: RecurlyListAccountSubscriptionsQueryDto,
		apiKey?: string,
	): Promise<RecurlySubscriptionList> {
		const queryString = query ? buildQueryString(query) : ''
		const url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/subscriptions${queryString ? '?' + queryString : ''}`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List account subscriptions')
		return response.json() as Promise<RecurlySubscriptionList>
	}

	/**
	 * Create a new subscription
	 * @param subscriptionData - The subscription data
	 * @param apiKey - Optional API key for runtime override
	 * @returns The created subscription
	 */
	async createSubscription(
		subscriptionData: RecurlyCreateSubscriptionDto,
		apiKey?: string,
	): Promise<RecurlySubscription> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions`

		const response = await fetch(url, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(subscriptionData),
		})

		await checkResponseIsOk(response, this.logger, 'Create subscription')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Get a subscription by ID
	 * @param subscriptionId - The subscription ID
	 * @param apiKey - Optional API key for runtime override
	 * @returns The subscription
	 */
	async getSubscription(subscriptionId: string, apiKey?: string): Promise<RecurlySubscription> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get subscription')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Update a subscription
	 * @param subscriptionId - The subscription ID
	 * @param updateData - The update data
	 * @param apiKey - Optional API key for runtime override
	 * @returns The updated subscription
	 */
	async updateSubscription(
		subscriptionId: string,
		updateData: RecurlyUpdateSubscriptionDto,
		apiKey?: string,
	): Promise<RecurlySubscription> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(updateData),
		})

		await checkResponseIsOk(response, this.logger, 'Update subscription')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Terminate a subscription
	 * @param subscriptionId - The subscription ID
	 * @param query - Query parameters for termination options
	 * @param apiKey - Optional API key for runtime override
	 * @returns The terminated subscription
	 */
	async terminateSubscription(
		subscriptionId: string,
		query?: RecurlyTerminateSubscriptionQueryDto,
		apiKey?: string,
	): Promise<RecurlySubscription> {
		const queryString = query ? buildQueryString(query) : ''
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}${queryString ? '?' + queryString : ''}`

		const response = await fetch(url, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Terminate subscription')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Cancel a subscription
	 * @param subscriptionId - The subscription ID
	 * @param cancelData - The cancellation data
	 * @param apiKey - Optional API key for runtime override
	 * @returns The canceled subscription
	 */
	async cancelSubscription(
		subscriptionId: string,
		cancelData?: RecurlyCancelSubscriptionDto,
		apiKey?: string,
	): Promise<RecurlySubscription> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/cancel`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(cancelData || {}),
		})

		await checkResponseIsOk(response, this.logger, 'Cancel subscription')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Reactivate a canceled subscription
	 * @param subscriptionId - The subscription ID
	 * @param apiKey - Optional API key for runtime override
	 * @returns The reactivated subscription
	 */
	async reactivateSubscription(subscriptionId: string, apiKey?: string): Promise<RecurlySubscription> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/reactivate`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify({}),
		})

		await checkResponseIsOk(response, this.logger, 'Reactivate subscription')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Pause a subscription
	 * @param subscriptionId - The subscription ID
	 * @param pauseData - The pause data
	 * @param apiKey - Optional API key for runtime override
	 * @returns The paused subscription
	 */
	async pauseSubscription(
		subscriptionId: string,
		pauseData: RecurlyPauseSubscriptionDto,
		apiKey?: string,
	): Promise<RecurlySubscription> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/pause`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(pauseData),
		})

		await checkResponseIsOk(response, this.logger, 'Pause subscription')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Resume a paused subscription
	 * @param subscriptionId - The subscription ID
	 * @param apiKey - Optional API key for runtime override
	 * @returns The resumed subscription
	 */
	async resumeSubscription(subscriptionId: string, apiKey?: string): Promise<RecurlySubscription> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/resume`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify({}),
		})

		await checkResponseIsOk(response, this.logger, 'Resume subscription')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Convert a trial subscription to a paid subscription
	 * @param subscriptionId - The subscription ID
	 * @param convertData - The conversion data
	 * @param apiKey - Optional API key for runtime override
	 * @returns The converted subscription
	 */
	async convertTrial(
		subscriptionId: string,
		convertData?: RecurlyConvertTrialDto,
		apiKey?: string,
	): Promise<RecurlySubscription> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/convert_trial`

		const response = await fetch(url, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(convertData || {}),
		})

		await checkResponseIsOk(response, this.logger, 'Convert trial')
		return response.json() as Promise<RecurlySubscription>
	}

	/**
	 * Preview a subscription renewal
	 * @param subscriptionId - The subscription ID
	 * @param apiKey - Optional API key for runtime override
	 * @returns The subscription renewal preview
	 */
	async previewRenewal(subscriptionId: string, apiKey?: string): Promise<any> {
		const url = `${RECURLY_API_BASE_URL}/subscriptions/${subscriptionId}/preview_renewal`

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Preview renewal')
		return response.json() as Promise<any>
	}
}
