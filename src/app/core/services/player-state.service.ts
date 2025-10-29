import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Track } from '../../models/track.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerStateService {
  private selectedTrackSubject = new BehaviorSubject<Track | null>(null);
  public selectedTrack$: Observable<Track | null> = this.selectedTrackSubject.asObservable();

  setSelectedTrack(track: Track): void {
    this.selectedTrackSubject.next(track);
  }

  getSelectedTrack(): Track | null {
    return this.selectedTrackSubject.value;
  }
}