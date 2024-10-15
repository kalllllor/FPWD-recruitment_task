import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
export declare class ExchangeService {
    private httpService;
    private cacheManager;
    private readonly apiUrl;
    private readonly apiKey;
    constructor(httpService: HttpService, cacheManager: Cache);
    getExchangeRate(): Promise<number>;
}
