import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from '../../shared/components/player/player';
import { PlayerStateService } from '../../core/services/player-state.service';
import { Track } from '../../models/track.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PlayerComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  selectedTrack$: Observable<Track | null>;

  constructor(private playerStateService: PlayerStateService) {
    this.selectedTrack$ = this.playerStateService.selectedTrack$;
  }
}
