import { Component, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { ExchangeService } from './services/exchange.service'
import { Exchange } from './class/exchange'
import { Rate } from './class/rate'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  name = 'MONEYXCHANGE.IO';
  dolar: number;
  euro: number;
  isdisabled : boolean = true;

  exchangeANY: Exchange = new Exchange;
  exchangeEUR: Exchange = new Exchange;

  constructor(private exchangeService: ExchangeService) { }

  ngOnInit(): void {
    this.exchangeService.getExchageUSDtoANY()
      .then(exchanges => {
        this.exchangeANY = exchanges;
      });
  }

  calculate(): void {
    console.log(this.dolar);
    if (!(this.dolar >= 0)) { return; }
    this.exchangeService.getExchageUSDtoEUR()
      .then(exchanges => {        
        this.exchangeEUR = exchanges;
        let change: number = this.exchangeEUR.rates[0].exchange;
        this.euro = this.dolar * change;
      });
  }
}
