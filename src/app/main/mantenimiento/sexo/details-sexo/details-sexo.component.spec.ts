import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsSexoComponent } from './details-sexo.component';

describe('DetailsSexoComponent', () => {
  let component: DetailsSexoComponent;
  let fixture: ComponentFixture<DetailsSexoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsSexoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsSexoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
