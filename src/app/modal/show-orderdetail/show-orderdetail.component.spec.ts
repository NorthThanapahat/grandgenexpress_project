import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowOrderdetailComponent } from './show-orderdetail.component';

describe('ShowOrderdetailComponent', () => {
  let component: ShowOrderdetailComponent;
  let fixture: ComponentFixture<ShowOrderdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowOrderdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowOrderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
