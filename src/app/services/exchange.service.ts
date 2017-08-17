import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Exchange } from '../class/exchange'

@Injectable()
export class ExchangeService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private exchageUSDtoANY = 'http://api.fixer.io/latest?base=USD';
    private exchageUSDtoEUR = 'http://api.fixer.io/latest?base=USD&symbols=EUR';

    constructor(private http: Http) { }

    getExchageUSDtoEUR(): Promise<Exchange> {
        return this.http.get(this.exchageUSDtoEUR)
            .toPromise()
            .then(response => this.toExchange(response.json()))
            .catch(this.handleError);
    }

    getExchageUSDtoANY(): Promise<Exchange> {
        return this.http.get(this.exchageUSDtoANY)
            .toPromise()
            .then(response => this.toExchange(response.json()))
            .catch(this.handleError);
    }

    toExchange(response: any): Exchange {
        let exchange = <Exchange>{
            base: response.base,
            date: response.date,
            rates: []
        }
        Object.keys(response.rates).forEach(function (key) {
            exchange.rates.push({ name: key, exchange: response.rates[key] });
        });
        return exchange;
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}