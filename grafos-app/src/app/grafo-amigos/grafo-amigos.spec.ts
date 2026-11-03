import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafoAmigos } from './grafo-amigos';

describe('GrafoAmigos', () => {
  let component: GrafoAmigos;
  let fixture: ComponentFixture<GrafoAmigos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrafoAmigos],
    }).compileComponents();

    fixture = TestBed.createComponent(GrafoAmigos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
