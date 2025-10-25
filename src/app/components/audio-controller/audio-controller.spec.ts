import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioController } from './audio-controller';

describe('AudioController', () => {
  let component: AudioController;
  let fixture: ComponentFixture<AudioController>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AudioController]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
