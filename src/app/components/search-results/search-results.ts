import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css']
})
export class SearchResultsComponent {
  @Input() tracks: any[] = [];
  @Output() trackSelected = new EventEmitter<any>();

  activeFilter: 'all' | 'songs' | 'artists' | 'albums' = 'all';

  get filteredTracks() {
    return this.tracks;
  }

  get songs() {
    return this.tracks;
  }

  get uniqueArtists() {
    const artistMap = new Map();
    this.tracks.forEach(track => {
      if (!artistMap.has(track.artist)) {
        artistMap.set(track.artist, {
          name: track.artist,
          image: track.albumArt,
          tracks: []
        });
      }
      artistMap.get(track.artist).tracks.push(track);
    });
    return Array.from(artistMap.values());
  }

  get uniqueAlbums() {
    const albumMap = new Map();
    this.tracks.forEach(track => {
      if (!albumMap.has(track.album)) {
        albumMap.set(track.album, {
          name: track.album,
          artist: track.artist,
          image: track.albumArt,
          tracks: []
        });
      }
      albumMap.get(track.album).tracks.push(track);
    });
    return Array.from(albumMap.values());
  }

  setFilter(filter: 'all' | 'songs' | 'artists' | 'albums') {
    this.activeFilter = filter;
  }

  selectTrack(track: any) {
    this.trackSelected.emit(track);
  }

  playArtistTrack(artist: any) {
    if (artist.tracks.length > 0) {
      this.trackSelected.emit(artist.tracks[0]);
    }
  }

  playAlbumTrack(album: any) {
    if (album.tracks.length > 0) {
      this.trackSelected.emit(album.tracks[0]);
    }
  }

  formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}