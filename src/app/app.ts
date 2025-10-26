import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './components/search-bar/search-bar';
import { TrackListComponent } from './components/track-list/track-list';
import { PlayerComponent } from './components/player/player';
import { SpotifyService } from './services/spotify';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SearchBarComponent,
    TrackListComponent,
    PlayerComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  tracks: any[] = [];
  selectedTrack: any | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private spotifyService: SpotifyService) {}

  onSearch(query: string): void {
    this.isLoading = true;
    this.error = null;

    this.spotifyService.searchTracks(query).subscribe({
      next: (tracks) => {
        this.tracks = tracks;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching tracks:', err);
        this.error = err.message || 'Error al buscar canciones. Verifica tu token de Spotify.';
        this.isLoading = false;
      }
    });
  }

  onTrackSelected(track: any): void {
    this.selectedTrack = track;
  }
}