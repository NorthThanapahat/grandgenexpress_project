import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUserComponent } from './manage-user.component';
import { ManageUserModule } from './manage-user.module';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ManageUserComponent', () => {
  let component: ManageUserComponent;
  let fixture: ComponentFixture<ManageUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ManageUserModule,
        RouterTestingModule,
        BrowserAnimationsModule,
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
