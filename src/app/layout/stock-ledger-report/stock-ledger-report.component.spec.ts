import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockLedgerReportComponent } from './stock-ledger-report.component';

describe('StockLedgerReportComponent', () => {
  let component: StockLedgerReportComponent;
  let fixture: ComponentFixture<StockLedgerReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockLedgerReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockLedgerReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
