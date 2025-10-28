import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './components/search-bar/search-bar';
import { TrackListComponent } from './components/track-list/track-list';
import { PlayerComponent } from './components/player/player';
import { SearchResultsComponent } from './components/search-results/search-results';
import { SpotifyService } from './services/spotify';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    SearchBarComponent,
    TrackListComponent,
    PlayerComponent,
    SearchResultsComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  // Resultados de búsqueda
  searchResults: any[] = [];
  
  // Playlist estática de LESSERAFIM
  staticPlaylist: any[] = [
    {
      id: '1',
      name: 'SPAGHETTI',
      artist: 'LE SSERAFIM',
      album: 'SPA',
      albumArt: 'https://i.scdn.co/image/ab67616d00001e026c4a726c271daf4a4b97e35b',
      duration: 193000,
      previewUrl: null
    },
    {
      id: '2',
      name: 'CRAZY',
      artist: 'LE SSERAFIM',
      album: 'CRAZY',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/3/35/Crazy_%28Le_Sserafim_album%29.png',
      duration: 153000,
      previewUrl: null
    },
    {
      id: '3',
      name: 'Pierrot',
      artist: 'LE SSERAFIM',
      album: 'CRAZY',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/3/35/Crazy_%28Le_Sserafim_album%29.png',
      duration: 169000,
      previewUrl: null
    },
    {
      id: '4',
      name: 'Chasing Lightning',
      artist: 'LE SSERAFIM',
      album: 'CRAZY',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/3/35/Crazy_%28Le_Sserafim_album%29.png',
      duration: 193000,
      previewUrl: null
    },
    {
      id: '5',
      name: 'UNFORGIVEN (feat. Nile Rodgers)',
      artist: 'LE SSERAFIM',
      album: 'UNFORGIVEN',
      albumArt: 'https://i.scdn.co/image/ab67616d00001e02a991995542d50a691b9ae5be',
      duration: 181000,
      previewUrl: null
    },
    {
      id: '6',
      name: 'Eve, Psyche & The Bluebeard\'s wife',
      artist: 'LE SSERAFIM',
      album: 'UNFORGIVEN',
      albumArt: 'https://i.scdn.co/image/ab67616d00001e02a991995542d50a691b9ae5be',
      duration: 191000,
      previewUrl: null
    },
    {
      id: '7',
      name: 'ANTIFRAGILE',
      artist: 'LE SSERAFIM',
      album: 'ANTIFRAGILE',
      albumArt: 'https://i.scdn.co/image/ab67616d00001e02a991995542d50a691b9ae5be',
      duration: 192000,
      previewUrl: null
    },
    {
      id: '8',
      name: 'Perfect Night',
      artist: 'LE SSERAFIM',
      album: 'Perfect Night',
      albumArt: 'https://i.scdn.co/image/ab67616d00001e027e1eeb0d7cc374a168369c80',
      duration: 188000,
      previewUrl: null
    }
  ];
  
  selectedTrack: any | null = null;
  isSearching: boolean = false;
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private spotifyService: SpotifyService) {
   
    this.selectedTrack = this.staticPlaylist[0];
  }

  onSearch(query: string): void {
    if (!query.trim()) {
      return;
    }

    this.isLoading = true;
    this.error = null;
    this.isSearching = true;

    this.spotifyService.searchTracks(query).subscribe({
      next: (tracks) => {
        this.searchResults = tracks;
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

  goToHome(): void {
    this.isSearching = false;
    this.searchResults = [];
    this.error = null;
  }
}