import { CouponCreateDto } from '../../coupon/coupon.dto'
import { CouponService } from '../../coupon/coupon.service'
import { canTest, suppressErrorTesting } from '../../v3.helpers'
import { RecurlyV3Module } from '../../v3.module'
import { RecurlyCreateAccountDto } from '../accounts.dto'
import { AccountsService } from '../accounts.service'
import { RecurlyCouponRedemptionCreateDto } from './couponRedemption.dto'
import { CouponRedemptionService } from './couponRedemption.service'
import { ConfigModule } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'

describe('CouponRedemption', () => {
	let service: CouponRedemptionService
	let couponService: CouponService
	let accountsService: AccountsService
	let accountId: string
	let couponId: string

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				ConfigModule.forRoot({
					envFilePath: '.env',
					isGlobal: true,
				}),
				RecurlyV3Module,
			],
		}).compile()

		service = module.get<CouponRedemptionService>(CouponRedemptionService)
		couponService = module.get<CouponService>(CouponService)
		accountsService = module.get<AccountsService>(AccountsService)
	})

	beforeAll(async () => {
		if (!canTest()) {
			console.warn('Skipping CouponRedemption tests due to configuration or environment issues.')
			return
		}

		// Create test account
		const accountData: RecurlyCreateAccountDto = {
			code: `test-account-${Date.now()}`,
			email: `test-${Date.now()}@example.com`,
			first_name: 'Test',
			last_name: 'User',
		}
		const account = await accountsService.createAccount(accountData)
		accountId = account.id!

		// Create test coupon
		const couponData: CouponCreateDto = {
			code: `TEST-COUPON-${Date.now()}`,
			name: 'Test Coupon for Redemption',
			discount_type: 'percent',
			discount_percent: 10,
			duration: 'forever',
		}
		const coupon = await couponService.createCoupon(couponData)
		couponId = coupon.id
	})

	describe('Coupon Redemption CRUD Operations', () => {
		it('should create a coupon redemption', async () => {
			const redemptionData: RecurlyCouponRedemptionCreateDto = {
				coupon_id: couponId,
				currency: 'USD',
			}

			const redemption = await service.createCouponRedemption(accountId, redemptionData)

			expect(redemption).toBeDefined()
			expect(redemption.id).toBeDefined()
			expect(redemption.state).toBe('active')
			expect(redemption.coupon).toBeDefined()
			expect(redemption.coupon.id).toBe(couponId)
		})

		it('should list account coupon redemptions', async () => {
			// First create a redemption
			const redemptionData: RecurlyCouponRedemptionCreateDto = {
				coupon_id: couponId,
				currency: 'USD',
			}
			await service.createCouponRedemption(accountId, redemptionData)

			// List redemptions
			const result = await service.listAccountCouponRedemptions(accountId, { limit: 10 })

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data.length).toBeGreaterThan(0)
		})

		it('should list active coupon redemptions', async () => {
			// First create a redemption
			const redemptionData: RecurlyCouponRedemptionCreateDto = {
				coupon_id: couponId,
				currency: 'USD',
			}
			await service.createCouponRedemption(accountId, redemptionData)

			// List active redemptions
			const result = await service.listActiveCouponRedemptions(accountId)

			expect(result).toBeDefined()
			expect(result.object).toBe('list')
			expect(Array.isArray(result.data)).toBe(true)
			expect(result.data.length).toBeGreaterThan(0)
			expect(result.data.every(r => r.state === 'active')).toBe(true)
		})

		it('should remove a coupon redemption', async () => {
			// First create a redemption
			const redemptionData: RecurlyCouponRedemptionCreateDto = {
				coupon_id: couponId,
				currency: 'USD',
			}
			await service.createCouponRedemption(accountId, redemptionData)

			// Remove the redemption
			const removedRedemption = await service.removeCouponRedemption(accountId)

			expect(removedRedemption).toBeDefined()
			expect(removedRedemption.id).toBeDefined()

			// Verify it's removed by checking active redemptions
			const activeRedemptions = await service.listActiveCouponRedemptions(accountId)
			expect(activeRedemptions.data.length).toBe(0)
		})

		//// Note: Invoice coupon redemptions require a invoice to be created first (we need to implement invoices for this test first)
		it.skip('should list invoice coupon redemptions', async () => {
			// Note: This test would require creating an invoice with a coupon redemption
			// Since invoice creation is complex and requires a subscription/charge,
			// we'll test that the method exists and handles empty results properly
			try {
				const result = await service.listInvoiceCouponRedemptions('non-existent-invoice', { limit: 10 })
				// If we get here, it should be an empty list
				expect(result.object).toBe('list')
				expect(Array.isArray(result.data)).toBe(true)
			} catch (error: any) {
				// Expected - invoice doesn't exist
				expect(error.message).toContain('404')
			}
		})

		// Note: Subscription coupon redemptions require a subscription to be created first (we need to implement subscriptions for this test first)
		it.skip('should list subscription coupon redemptions', async () => {
			// Note: This test would require creating a subscription with a coupon redemption
			// Since subscription creation is complex,
			// we'll test that the method exists and handles empty results properly
			try {
				const result = await service.listSubscriptionCouponRedemptions('non-existent-subscription', {
					limit: 10,
				})
				// If we get here, it should be an empty list
				expect(result.object).toBe('list')
				expect(Array.isArray(result.data)).toBe(true)
			} catch (error: any) {
				// Expected - subscription doesn't exist
				expect(error.message).toContain('404')
			}
		})
	})

	// Cleanup: Remove test data
	afterAll(async () => {
		// Try to remove coupon redemption first
		if (accountId) {
			await suppressErrorTesting(service, async () => {
				await service.removeCouponRedemption(accountId)
			})
		}

		// Deactivate coupon
		if (couponId) {
			await suppressErrorTesting(couponService, async () => {
				await couponService.deactivateCoupon(couponId)
			})
		}

		// Deactivate account
		if (accountId) {
			await suppressErrorTesting(accountsService, async () => {
				await accountsService.deactivateAccount(accountId)
			})
		}
	})
})
