import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Buscador } from './buscador';

describe('Buscador', () => {
  let component: Buscador;
  let fixture: ComponentFixture<Buscador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buscador],
    }).compileComponents();

    fixture = TestBed.createComponent(Buscador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('searchTopK("air", 2) returns air force and air max', () => {
    const result = component.trie.searchTopK('air', 2);

    expect(result).toEqual([
      { name: 'air force', popularity: 95 },
      { name: 'air max', popularity: 90 },
    ]);
  });

  it('returns an empty list when the prefix does not exist', () => {
    expect(component.trie.searchTopK('puma', 3)).toEqual([]);
  });

  it('normalizes to lowercase when searching', () => {
    component.prefijo = 'AIR';
    component.k = 1;
    component.buscar();

    expect(component.resultados()[0].name).toBe('air force');
  });

  it('shows an error for a duplicated product', () => {
    component.nombre = 'Air Max';
    component.popularidad = 50;
    component.agregarProducto();

    expect(component.msg).toBe('Ya existe un producto con ese nombre');
    expect(component.total()).toBe(4);
  });

  it('adds a new product', () => {
    component.nombre = 'Puma Suede';
    component.popularidad = 70;
    component.agregarProducto();

    expect(component.msg).toBe('Producto agregado');
    expect(component.trie.search('puma suede')).toBe(true);
  });
});
