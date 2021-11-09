import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsFuncionarioComponent } from './details-funcionario.component';

describe('DetailsFuncionarioComponent', () => {
  let component: DetailsFuncionarioComponent;
  let fixture: ComponentFixture<DetailsFuncionarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsFuncionarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsFuncionarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
