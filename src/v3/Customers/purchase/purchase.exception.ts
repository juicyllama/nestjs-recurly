import { RecurlyPurchaseError } from '@/v3/Customers/purchase/purchase.types'

export class PurchaseException extends Error {
	public readonly errorData: RecurlyPurchaseError

	constructor(error: RecurlyPurchaseError) {
		super()
		this.errorData = error
	}
}
