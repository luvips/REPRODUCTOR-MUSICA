import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SpotifyService } from '../../../../core/services/spotify.service';
import { PlayerStateService } from '../../../../core/services/player-state.service';
import { Track } from '../../../../models/track.model';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.html',
  styleUrls: ['./search-results.css']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  results: Track[] = [];
  isLoading: boolean = false;
  error: string | null = null;
  activeFilter: 'all' | 'songs' | 'artists' | 'albums' = 'all';
  
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService,
    private playerStateService: PlayerStateService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const query = params['query'];

        if (query && query.trim()) {
          this.performSearch(query);
        } else {
          this.results = [];
          this.error = null;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private performSearch(query: string): void {
    this.isLoading = true;
    this.error = null;

    this.spotifyService.searchTracks(query).subscribe({
      next: (tracks) => {
        this.results = tracks;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error searching tracks:', err);
        this.error = err.message || 'Error al buscar canciones. Verifica tu token de Spotify.';
        this.isLoading = false;
      }
    });
  }

  get songs() {
    return this.results;
  }

  get uniqueArtists() {
    const artistMap = new Map();
    this.results.forEach(track => {
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
    this.results.forEach(track => {
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

  selectTrack(track: Track): void {
    this.playerStateService.setSelectedTrack(track);
  }

  playArtistTrack(artist: any): void {
    if (artist.tracks.length > 0) {
      this.playerStateService.setSelectedTrack(artist.tracks[0]);
    }
  }

  playAlbumTrack(album: any): void {
    if (album.tracks.length > 0) {
      this.playerStateService.setSelectedTrack(album.tracks[0]);
    }
  }

  formatDuration(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}