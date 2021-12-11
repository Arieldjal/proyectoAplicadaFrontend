import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrimestreComponent } from './add-trimestre.component';

describe('AddTrimestreComponent', () => {
  let component: AddTrimestreComponent;
  let fixture: ComponentFixture<AddTrimestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrimestreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
