import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistCanciones } from './playlist-canciones';

describe('PlaylistCanciones', () => {
  let component: PlaylistCanciones;
  let fixture: ComponentFixture<PlaylistCanciones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistCanciones],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistCanciones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
