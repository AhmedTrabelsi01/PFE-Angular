import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupasmentorComponent } from './signupasmentor.component';

describe('SignupasmentorComponent', () => {
  let component: SignupasmentorComponent;
  let fixture: ComponentFixture<SignupasmentorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupasmentorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupasmentorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
