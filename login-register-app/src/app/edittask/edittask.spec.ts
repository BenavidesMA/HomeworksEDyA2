import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Edittask } from './edittask';

describe('Edittask', () => {
  let component: Edittask;
  let fixture: ComponentFixture<Edittask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Edittask],
    }).compileComponents();

    fixture = TestBed.createComponent(Edittask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
