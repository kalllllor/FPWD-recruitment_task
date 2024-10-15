import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class ExchangeService {
  private readonly apiUrl =
    'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api';
  private readonly apiKey = process.env.API_KEY;

  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getExchangeRate(): Promise<number> {
    const cachedRate = await this.cacheManager.get<number>('exchange_rate');
    console.log(cachedRate);
    if (cachedRate) {
      return cachedRate;
    }

    const response = await firstValueFrom(
      this.httpService.get(this.apiUrl, {
        headers: { 'x-api-key': this.apiKey },
      }),
    );

    const { exchange_rate } = response.data;
    await this.cacheManager.set('exchange_rate', exchange_rate, 60000);

    return exchange_rate;
  }
}
