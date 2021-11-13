import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAvanceComponent } from './details-avance.component';

describe('DetailsAvanceComponent', () => {
  let component: DetailsAvanceComponent;
  let fixture: ComponentFixture<DetailsAvanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAvanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAvanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
