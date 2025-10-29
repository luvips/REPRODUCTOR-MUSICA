import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../../models/track.model';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-list.html',
  styleUrls: ['./track-list.css']
})
export class TrackListComponent {
  @Input() tracks: Track[] = [];
  @Input() currentTrack: Track | null = null;
  @Output() trackSelected = new EventEmitter<Track>();

  selectTrack(track: Track): void {
    this.trackSelected.emit(track);
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}