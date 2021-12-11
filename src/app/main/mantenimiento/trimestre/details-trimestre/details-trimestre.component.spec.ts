import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTrimestreComponent } from './details-trimestre.component';

describe('DetailsTrimestreComponent', () => {
  let component: DetailsTrimestreComponent;
  let fixture: ComponentFixture<DetailsTrimestreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTrimestreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTrimestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
