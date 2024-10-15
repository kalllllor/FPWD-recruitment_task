"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExchangeService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const common_2 = require("@nestjs/common");
const cache_manager_1 = require("@nestjs/cache-manager");
let ExchangeService = class ExchangeService {
    constructor(httpService, cacheManager) {
        this.httpService = httpService;
        this.cacheManager = cacheManager;
        this.apiUrl = 'https://ldktuanhf9.execute-api.eu-central-1.amazonaws.com/api';
        this.apiKey = process.env.API_KEY;
    }
    async getExchangeRate() {
        const cachedRate = await this.cacheManager.get('exchange_rate');
        console.log(cachedRate);
        if (cachedRate) {
            return cachedRate;
        }
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(this.apiUrl, {
            headers: { 'x-api-key': this.apiKey },
        }));
        const { exchange_rate } = response.data;
        await this.cacheManager.set('exchange_rate', exchange_rate, 60000);
        return exchange_rate;
    }
};
exports.ExchangeService = ExchangeService;
exports.ExchangeService = ExchangeService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_2.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object])
], ExchangeService);
//# sourceMappingURL=exchange.service.js.map