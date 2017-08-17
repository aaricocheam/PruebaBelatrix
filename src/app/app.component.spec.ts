import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ExchangeService } from './services/exchange.service'

import { AppComponent } from './app.component';
import { Observable } from 'rxjs';

describe('AppComponent', () => {
  let exchangeService  = {
    getExchageUSDtoANY() {
      return Observable.of({ base: 'USD', date: '16/08/2017', rates: [{ name: 'EUR', exchange: 1.25 }] });
    }
  };
  
  let fixture: ComponentFixture<AppComponent>;
  let instance : AppComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: ExchangeService, useValue: exchangeService  }
      ]
    });

    fixture = TestBed.createComponent(AppComponent);
    instance = fixture.componentInstance;

  });

  it('calcular tipo de cambio de dolar a euro (cero)', inject([ExchangeService], (exchangeService: ExchangeService)  => {
    spyOn(exchangeService, 'getExchageUSDtoANY').and.callThrough();
    instance.ngOnInit();
    expect(exchangeService.getExchageUSDtoANY).toHaveBeenCalled();
  }));

  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));

  // it(`should have as title 'app'`, async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('app');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
  // }));

});
