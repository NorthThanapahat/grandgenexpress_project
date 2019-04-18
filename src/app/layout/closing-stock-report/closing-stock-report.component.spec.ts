import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosingStockReportComponent } from './closing-stock-report.component';

describe('ClosingStockReportComponent', () => {
  let component: ClosingStockReportComponent;
  let fixture: ComponentFixture<ClosingStockReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosingStockReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosingStockReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
