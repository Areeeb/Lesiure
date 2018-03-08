import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageSocialComponent } from './admin-page-social.component';

describe('AdminPageSocialComponent', () => {
  let component: AdminPageSocialComponent;
  let fixture: ComponentFixture<AdminPageSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
