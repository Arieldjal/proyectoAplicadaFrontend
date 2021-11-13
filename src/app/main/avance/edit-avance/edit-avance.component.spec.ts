import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAvanceComponent } from './edit-avance.component';

describe('EditAvanceComponent', () => {
  let component: EditAvanceComponent;
  let fixture: ComponentFixture<EditAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
