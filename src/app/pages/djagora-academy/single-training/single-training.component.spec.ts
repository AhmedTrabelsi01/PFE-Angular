import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleTrainingComponent } from './single-training.component';

describe('SingleTrainingComponent', () => {
  let component: SingleTrainingComponent;
  let fixture: ComponentFixture<SingleTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
