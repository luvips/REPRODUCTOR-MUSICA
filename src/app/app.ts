import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SearchBarComponent } from './shared/components/search-bar/search-bar';
import { PlayerComponent } from './shared/components/player/player';
import { TrackListComponent } from './shared/components/track-list/track-list';
import { PlayerStateService } from './core/services/player-state.service';
import { Track } from './models/track.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,

    SearchBarComponent,
    PlayerComponent,
    TrackListComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent implements OnInit {
  playlist: Track[] = [
    {
      id: '1',
      name: 'SPAGHETTI',
      artist: 'LE SSERAFIM',
      album: 'SPA',
      albumArt: 'https://i.scdn.co/image/ab67616d00001e026c4a726c271daf4a4b97e35b',
      duration: 193000,
      previewUrl: 'https://p.scdn.co/mp3-preview/3b1f0b3b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b0b'
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

  selectedTrack: Track | null = null;

  constructor(private router: Router, private playerStateService: PlayerStateService) {}

  ngOnInit(): void {
    // Precargar la primera canción (SPAGHETTI)
    this.playerStateService.setSelectedTrack(this.playlist[0]);

    this.playerStateService.selectedTrack$.subscribe(track => {
      this.selectedTrack = track;
    });
  }

  onSearch(query: string): void {
    if (!query || !query.trim()) {
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/search', query]);
    }
  }

  onTrackSelected(track: Track): void {
    this.playerStateService.setSelectedTrack(track);
  }
}
