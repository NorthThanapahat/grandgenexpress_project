import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryInvoiceComponent } from './inquiry-invoice.component';

describe('InquiryInvoiceComponent', () => {
  let component: InquiryInvoiceComponent;
  let fixture: ComponentFixture<InquiryInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
