import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAtencion } from './historial-atencion';

describe('HistorialAtencion', () => {
  let component: HistorialAtencion;
  let fixture: ComponentFixture<HistorialAtencion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialAtencion],
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialAtencion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
