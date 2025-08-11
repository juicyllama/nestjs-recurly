import { RecurlyConfigDto } from '../../config/config.dto'
import { InjectConfig } from '../../config/config.provider'
import { RECURLY_API_BASE_URL } from '../v3.constants'
import { buildQueryString, checkResponseIsOk, getHeaders } from '../v3.helpers'
import {
	ListAccountsQueryDto,
	CreateAccountDto,
	UpdateAccountDto,
	ListChildAccountsQueryDto,
	ListExternalSubscriptionsQueryDto,
} from './accounts.dto'
import { RecurlyAccount, AccountListResponse, AccountBalance, ExternalSubscriptionListResponse } from './accounts.types'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
export class AccountsService {
	private readonly logger = new Logger(AccountsService.name)

	constructor(@InjectConfig(RecurlyConfigDto) private readonly config: RecurlyConfigDto) {}

	async listAccounts(params?: ListAccountsQueryDto, apiKey?: string): Promise<AccountListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Accounts')
		return (await response.json()) as AccountListResponse
	}

	async createAccount(data: CreateAccountDto, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts`, {
			method: 'POST',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Create Account')

		return (await response.json()) as RecurlyAccount
	}

	async getAccount(accountId: string, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Account')

		return (await response.json()) as RecurlyAccount
	}

	async updateAccount(accountId: string, data: UpdateAccountDto, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
			body: JSON.stringify(data),
		})

		await checkResponseIsOk(response, this.logger, 'Update Account')
		return (await response.json()) as RecurlyAccount
	}

	async deactivateAccount(accountId: string, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}`, {
			method: 'DELETE',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Deactivate Account')
		return (await response.json()) as RecurlyAccount
	}

	async reactivateAccount(accountId: string, apiKey?: string): Promise<RecurlyAccount> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}/reactivate`, {
			method: 'PUT',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Reactivate Account')
		return (await response.json()) as RecurlyAccount
	}

	async getAccountBalance(accountId: string, apiKey?: string): Promise<AccountBalance> {
		const response = await fetch(`${RECURLY_API_BASE_URL}/accounts/${accountId}/balance`, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'Get Account Balance')
		return (await response.json()) as AccountBalance
	}

	async listChildAccounts(
		accountId: string,
		params?: ListChildAccountsQueryDto,
		apiKey?: string,
	): Promise<AccountListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/accounts`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Child Accounts')
		return (await response.json()) as AccountListResponse
	}

	async listAccountExternalSubscriptions(
		accountId: string,
		params?: ListExternalSubscriptionsQueryDto,
		apiKey?: string,
	): Promise<ExternalSubscriptionListResponse> {
		let url = `${RECURLY_API_BASE_URL}/accounts/${accountId}/external_subscriptions`

		if (params && Object.keys(params).length > 0) {
			url += '?' + buildQueryString(params)
		}

		const response = await fetch(url, {
			method: 'GET',
			headers: getHeaders(this.config, apiKey),
		})

		await checkResponseIsOk(response, this.logger, 'List Account External Subscriptions')
		return (await response.json()) as ExternalSubscriptionListResponse
	}
}
