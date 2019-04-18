import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgerAccoutEnquiryComponent } from './ledger-accout-enquiry.component';

describe('LedgerAccoutEnquiryComponent', () => {
  let component: LedgerAccoutEnquiryComponent;
  let fixture: ComponentFixture<LedgerAccoutEnquiryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgerAccoutEnquiryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgerAccoutEnquiryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
