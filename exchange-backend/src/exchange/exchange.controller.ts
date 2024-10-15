import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get('rate')
  async getExchangeRate() {
    const exchangeRate = await this.exchangeService.getExchangeRate();
    return { exchangeRate };
  }

  @Post('transaction')
  async simulateTransaction(@Body() body: { amount: number }) {
    const rate = await this.exchangeService.getExchangeRate();
    const amountInPLN = body.amount * rate;
    const transaction = {
      amountInEUR: body.amount,
      amountInPLN,
      rate,
      timestamp: new Date(),
    };

    return { transaction };
  }
}
