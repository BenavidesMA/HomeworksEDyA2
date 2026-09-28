import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbolD3 } from './arbol-d3';

describe('ArbolD3', () => {
  let component: ArbolD3;
  let fixture: ComponentFixture<ArbolD3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArbolD3],
    }).compileComponents();

    fixture = TestBed.createComponent(ArbolD3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
