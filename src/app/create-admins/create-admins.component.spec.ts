import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAdminsComponent } from './create-admins.component';

describe('CreateAdminsComponent', () => {
  let component: CreateAdminsComponent;
  let fixture: ComponentFixture<CreateAdminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAdminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAdminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
