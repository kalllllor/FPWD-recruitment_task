import { ExchangeService } from './exchange.service';
export declare class ExchangeController {
    private readonly exchangeService;
    constructor(exchangeService: ExchangeService);
    getExchangeRate(): Promise<{
        exchangeRate: number;
    }>;
    simulateTransaction(body: {
        amount: number;
    }): Promise<{
        transaction: {
            amountInEUR: number;
            amountInPLN: number;
            rate: number;
            timestamp: Date;
        };
    }>;
}
