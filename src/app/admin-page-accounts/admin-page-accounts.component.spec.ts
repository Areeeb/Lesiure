import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageAccountsComponent } from './admin-page-accounts.component';

describe('AdminPageAccountsComponent', () => {
  let component: AdminPageAccountsComponent;
  let fixture: ComponentFixture<AdminPageAccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageAccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
