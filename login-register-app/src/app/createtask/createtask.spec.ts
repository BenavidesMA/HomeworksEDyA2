import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Createtask } from './createtask';

describe('Createtask', () => {
  let component: Createtask;
  let fixture: ComponentFixture<Createtask>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Createtask],
    }).compileComponents();

    fixture = TestBed.createComponent(Createtask);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
