import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComiteAdmin } from './comite-admin';

describe('ComiteAdmin', () => {
  let component: ComiteAdmin;
  let fixture: ComponentFixture<ComiteAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComiteAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(ComiteAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
