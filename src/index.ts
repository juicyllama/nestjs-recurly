//Module
export { RecurlyV3Module } from './v3/v3.module'

//Service
export { AccountsService } from './v3/accounts/accounts.service'

//Config
export { RecurlyConfigDto } from './config/config.dto'

//Types
export {
	RecurlyAccount,
	RecurlyAccountBalance,
	RecurlyAccountListResponse,
	RecurlyExternalSubscriptionListResponse,
	RecurlyAccountState,
	RecurlyAddress,
	RecurlyBillingInfo,
	RecurlyShippingAddress,
	// Backward compatibility - deprecated, use Recurly-prefixed versions instead
	RecurlyAccountBalance as AccountBalance,
	RecurlyAccountListResponse as AccountListResponse,
	RecurlyExternalSubscriptionListResponse as ExternalSubscriptionListResponse,
	RecurlyAccountState as AccountState,
	RecurlyAddress as Address,
	RecurlyBillingInfo as BillingInfo,
	RecurlyShippingAddress as ShippingAddress,
} from './v3/accounts/accounts.types'

//DTOs
export {
	RecurlyListAccountsQueryDto,
	RecurlyCreateAccountDto,
	RecurlyUpdateAccountDto,
	RecurlyAddressDto,
	RecurlyBillingInfoCreateDto,
	RecurlyShippingAddressDto,
	// Backward compatibility - deprecated, use Recurly-prefixed versions instead
	RecurlyListAccountsQueryDto as ListAccountsQueryDto,
	RecurlyCreateAccountDto as CreateAccountDto,
	RecurlyUpdateAccountDto as UpdateAccountDto,
	RecurlyAddressDto as AddressDto,
	RecurlyBillingInfoCreateDto as BillingInfoCreateDto,
	RecurlyShippingAddressDto as ShippingAddressDto,
} from './v3/accounts/accounts.dto'
