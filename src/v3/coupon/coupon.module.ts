import { Module } from '@nestjs/common';
import { RecurlyConfigDto } from '../../config/config.dto';
import { ConfigValidationModule } from '../../config/config.module';
import { CouponService } from './coupon.service';

@Module({
	imports: [ConfigValidationModule.register(RecurlyConfigDto)],
	providers: [CouponService],
	exports: [CouponService],
})
export class CouponModule {}
