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
  @Output() trackSelected = new EventEmitter<any>();

  selectTrack(track: any): void {
    this.trackSelected.emit(track);
  }
}