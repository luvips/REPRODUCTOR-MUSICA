import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-track-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './track-list.html',
  styleUrls: ['./track-list.css']
})
export class TrackListComponent {
  @Input() tracks: any[] = [];
  @Input() currentTrack: any | null = null;
  @Input() isSearching: boolean = false;
  @Output() trackSelected = new EventEmitter<any>();

  isPlaying: boolean = false;

  selectTrack(track: any): void {
    this.trackSelected.emit(track);
  }

  togglePlay(): void {
    this.isPlaying = !this.isPlaying;
  }

  formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  getAccentColor(): string {
    if (!this.currentTrack) return '#1db954';
    const colors = ['#1db954', '#1ed760', '#ff6b6b', '#4ecdc4', '#a78bfa', '#fb923c'];
    const index = this.currentTrack.id.length % colors.length;
    return colors[index];
  }
}