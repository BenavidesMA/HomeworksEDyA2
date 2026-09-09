import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionPacientes } from './gestion-pacientes';

describe('GestionPacientes', () => {
  let component: GestionPacientes;
  let fixture: ComponentFixture<GestionPacientes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestionPacientes],
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPacientes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
