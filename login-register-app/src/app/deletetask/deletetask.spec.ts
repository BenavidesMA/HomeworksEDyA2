import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Deletetask } from './deletetask';

describe('Deletetask', () => {
  let component: Deletetask;
  let fixture: ComponentFixture<Deletetask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Deletetask],
    }).compileComponents();

    fixture = TestBed.createComponent(Deletetask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
