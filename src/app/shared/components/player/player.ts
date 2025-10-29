import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Track } from '../../../models/track.model';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrls: ['./player.css']
})
export class PlayerComponent {
  @Input() track: Track | null = null;
  @Input() displayMode: 'full' | 'image-only' | 'compact' = 'full';
  
  isLiked: boolean = false;
  currentTime: number = 0;
  isPlaying: boolean = false;

  toggleLike(): void {
    this.isLiked = !this.isLiked;
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
    return '#ff6b00';
  }
}