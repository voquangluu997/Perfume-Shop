import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PerfumeModule } from './perfume/perfume.module';
import { BrandsModule } from './brands/brands.module';
import { FragranceModule } from './fragrances/fragrance.module';
import { ReviewModule } from './review/review.module';
import { CartModule } from './cart/cart.module';
import { BookingModule } from './booking/booking.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${process.env.STAGE == 'prod' ? '.env.stage.prod' : '.env.stage.dev'}`,
      ],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const isProduction = process.env.STAGE === 'prod';

        return {
          ssl: isProduction,
          extra: {
            ssl: isProduction ? { rejectUnauthorized: false } : null,
          },
          type: 'postgres',
          autoLoadEntities: true,
          entities: ['dist/src/**/*.entity.ts'],
          synchronize: true,
          url: configService.get('DB_URL'),
        };
      },
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    UsersModule,
    AuthModule,
    PerfumeModule,
    BrandsModule,
    FragranceModule,
    ReviewModule,
    CartModule,
    BookingModule,
  ],
})
export class AppModule {}
