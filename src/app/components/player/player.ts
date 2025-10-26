import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player.html',
  styleUrls: ['./player.css']
})
export class PlayerComponent {
  @Input() track: any | null = null;
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
    if (!this.track) return '#1db954';
    const colors = ['#1db954', '#1ed760', '#ff6b6b', '#4ecdc4', '#a78bfa', '#fb923c'];
    const index = this.track.id.length % colors.length;
    return colors[index];
  }
}