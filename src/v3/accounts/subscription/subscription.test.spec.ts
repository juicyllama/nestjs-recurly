import { canTest, suppressErrorTesting } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { AccountsModule } from '../accounts.module'
import { AccountsService } from '../accounts.service'
import { RecurlySubscriptionModule } from './subscription.module'
import { RecurlySubscriptionService } from './subscription.service'
import { faker } from '@faker-js/faker'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

/* NOTE: This test suite requires:
 * 1. A valid Recurly account configured in the environment
 * 
 * The subscription creation tests are skipped by default because they require
 * a plan to exist in your Recurly account. To enable them:
 * 1. Create a plan in your Recurly test environment
 * 2. Update TEST_PLAN_CODE below with your plan code
 * 3. Remove the .skip from the subscription creation tests
 */

describe('Subscription', () => {
	let subscriptionService: RecurlySubscriptionService
	let accountsService: AccountsService
	let testAccountId: string
	let testSubscriptionId: string
	let testAccountCode: string

	// Update this with your actual test plan code to enable subscription creation tests
	const TEST_PLAN_CODE = 'test-plan-code' // Change this to your actual plan code
	const TEST_CURRENCY = 'USD'

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping Subscription tests due to configuration or environment issues.')
			return
		}

		const module: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), RecurlyV3Module, AccountsModule, RecurlySubscriptionModule],
		}).compile()

		subscriptionService = module.get<RecurlySubscriptionService>(RecurlySubscriptionService)
		accountsService = module.get<AccountsService>(AccountsService)

		// Create a test account for the subscription tests
		testAccountCode = faker.string.alpha(49)
		const testAccount = await accountsService.createAccount({
			code: testAccountCode,
			email: faker.internet.email(),
			first_name: 'Test',
			last_name: 'Subscription',
		})
		testAccountId = testAccount.id!
	})

	afterAll(async () => {
		if (!canTest() || !testAccountId) return

		// Cleanup: Deactivate test account
		await suppressErrorTesting(accountsService, accountsService.deactivateAccount, testAccountId)
	})

	describe('CRUD Operations', () => {
		// 1. CREATE
		describe('createSubscription', () => {
			it.skip('should create a subscription successfully', async () => {
				if (!canTest()) return

				// This test requires a valid plan to exist in Recurly
				// To enable: Update TEST_PLAN_CODE at the top of this file and remove .skip
				const createData = {
					account: { code: testAccountCode },
					plan_code: TEST_PLAN_CODE,
					currency: TEST_CURRENCY,
				}

				const subscription = await subscriptionService.createSubscription(createData)

				expect(subscription).toBeDefined()
				expect(subscription.id).toBeDefined()
				expect(subscription.state).toBeDefined()
				expect(subscription.account?.code).toBe(testAccountCode)

				// Store for later tests
				testSubscriptionId = subscription.id!
			})

			it('should handle errors when creating a subscription with invalid data', async () => {
				if (!canTest()) return

				const createData = {
					account: { code: 'nonexistent-account' },
					plan_code: 'nonexistent-plan',
					currency: 'USD',
				}

				await expect(subscriptionService.createSubscription(createData)).rejects.toThrow()
			})
		})

				// 2. READ
		describe('listSubscriptions', () => {
			it('should list subscriptions successfully', async () => {
				if (!canTest()) return

				const subscriptions = await subscriptionService.listSubscriptions({ state: 'active' })

				expect(subscriptions).toBeDefined()
				expect(Array.isArray(subscriptions.data)).toBe(true)
				expect(subscriptions.has_more).toBeDefined()
			})

			it('should list subscriptions for a specific account', async () => {
				if (!canTest() || !testAccountCode) return

				const subscriptions = await subscriptionService.listAccountSubscriptions(testAccountId, {
					state: 'active',
				})

				expect(subscriptions).toBeDefined()
				expect(Array.isArray(subscriptions.data)).toBe(true)
			})
		})

		describe('getSubscription', () => {
			it.skip('should get a subscription successfully', async () => {
				if (!canTest() || !testSubscriptionId) return

				const subscription = await subscriptionService.getSubscription(testSubscriptionId)

				expect(subscription).toBeDefined()
				expect(subscription.id).toBe(testSubscriptionId)
				expect(subscription.state).toBeDefined()
			})

			it('should handle errors when getting a non-existent subscription', async () => {
				if (!canTest()) return

				await expect(subscriptionService.getSubscription('nonexistent-sub')).rejects.toThrow()
			})
		})



		// 3. UPDATE
		describe('updateSubscription', () => {
			it.skip('should update a subscription successfully', async () => {
				if (!canTest() || !testSubscriptionId) return

				const updateData = { auto_renew: false }
				const updatedSubscription = await subscriptionService.updateSubscription(
					testSubscriptionId,
					updateData,
				)

				expect(updatedSubscription).toBeDefined()
				expect(updatedSubscription.id).toBe(testSubscriptionId)
				// Note: Quantity update might not be reflected depending on your plan setup
			})
		})

		// 4. DELETE (Terminate)
		describe('terminateSubscription', () => {
			it.skip('should cancel a subscription at end of period', async () => {
				if (!canTest() || !testSubscriptionId) return

				const canceledSubscription = await subscriptionService.cancelSubscription(testSubscriptionId)

				expect(canceledSubscription).toBeDefined()
				expect(canceledSubscription.id).toBe(testSubscriptionId)
				expect(canceledSubscription.state).toBe('active') // Still active until end of period
				expect(canceledSubscription.canceled_at).toBeDefined()
			})

			it.skip('should terminate a subscription immediately', async () => {
				if (!canTest() || !testSubscriptionId) return

				// First reactivate if it was canceled
				await suppressErrorTesting(
					subscriptionService,
					subscriptionService.reactivateSubscription,
					testSubscriptionId,
				)

				const terminatedSubscription = await subscriptionService.terminateSubscription(
					testSubscriptionId,
					{ refund: 'none' },
				)

				expect(terminatedSubscription).toBeDefined()
				expect(terminatedSubscription.id).toBe(testSubscriptionId)
				expect(terminatedSubscription.state).toBe('canceled')
			})
		})
	})
})
