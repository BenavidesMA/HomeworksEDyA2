import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasNavegador } from './paginas-navegador';

describe('PaginasNavegador', () => {
  let component: PaginasNavegador;
  let fixture: ComponentFixture<PaginasNavegador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginasNavegador],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginasNavegador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
