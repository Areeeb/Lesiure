import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPageGameComponent } from './admin-page-game.component';

describe('AdminPageGameComponent', () => {
  let component: AdminPageGameComponent;
  let fixture: ComponentFixture<AdminPageGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPageGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPageGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
