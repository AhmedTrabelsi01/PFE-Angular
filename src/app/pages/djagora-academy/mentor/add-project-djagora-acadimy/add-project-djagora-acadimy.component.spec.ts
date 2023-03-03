import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProjectDjagoraAcadimyComponent } from './add-project-djagora-acadimy.component';

describe('AddProjectDjagoraAcadimyComponent', () => {
  let component: AddProjectDjagoraAcadimyComponent;
  let fixture: ComponentFixture<AddProjectDjagoraAcadimyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProjectDjagoraAcadimyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProjectDjagoraAcadimyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
