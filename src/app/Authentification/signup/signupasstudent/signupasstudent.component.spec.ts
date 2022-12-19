import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupasstudentComponent } from './signupasstudent.component';

describe('SignupasstudentComponent', () => {
  let component: SignupasstudentComponent;
  let fixture: ComponentFixture<SignupasstudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupasstudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupasstudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
