import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';

import { Injectable } from '@nestjs/common';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: new ConfigService().get('GOOGLE_CLIENT_ID'),
      clientSecret: new ConfigService().get('GOOGLE_SECRET'),
      callbackURL: new ConfigService().get('GOOGLE_REDIRECT'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, phone, address } = profile;
    const user = {
      email: emails[0].value,
      fullname: name.givenName + name.familyName,
      phone,
      address,
      accessToken,
    };
    done(null, user);
  }
}
