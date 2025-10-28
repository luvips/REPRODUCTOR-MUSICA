import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map, catchError, throwError, switchMap, BehaviorSubject, filter, take } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = environment.API_URL;
  private authUrl = environment.AUTH_API_URL;
  private clientId = environment.CLIENT_ID;
  private clientSecret = environment.CLIENT_SECRET;
  
  private tokenSubject = new BehaviorSubject<string>('');
  private token$ = this.tokenSubject.asObservable();

  constructor(private http: HttpClient) {
    if (environment.TOKEN) {
      this.tokenSubject.next(environment.TOKEN);
    } else {
      // Si no, se genera uno automáticamente
      this.refreshToken();
    }
  }


  private refreshToken(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    });

    const body = 'grant_type=client_credentials';

    this.http.post<any>(this.authUrl, body, { headers })
      .subscribe({
        next: (response) => {
          console.log('Token obtenido exitosamente');
          this.tokenSubject.next(response.access_token);
          
          // Renovar token automáticamente antes de que expire (50 minutos)
          setTimeout(() => this.refreshToken(), 50 * 60 * 1000);
        },
        error: (error) => {
          console.error('Error obteniendo token:', error);
        }
      });
  }

  /**
   * Búsqueda de canciones
   */
  searchTracks(query: string): Observable<any[]> {
    return this.token$.pipe(
      filter(token => !!token),
      take(1),
      switchMap(token => {
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.get<any>(
          `${this.apiUrl}/search?q=${encodeURIComponent(query)}&type=track&limit=10`, 
          { headers }
        );
      }),
      map(response => {
        if (!response.tracks || !response.tracks.items) {
          return [];
        }
        
        return response.tracks.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          artist: item.artists[0]?.name || 'Unknown Artist',
          album: item.album.name,
          albumArt: item.album.images[0]?.url || 'assets/default-album.png',
          duration: item.duration_ms,
          previewUrl: item.preview_url
        }));
      }),
      catchError(error => {
        console.error('Spotify API Error:', error);
        
        if (error.status === 401) {
          // Si el token expiró, renovarlo
          this.refreshToken();
          return throwError(() => new Error('Token expirado, renovando...'));
        }
        
        return throwError(() => new Error('Error al buscar canciones.'));
      })
    );
  }
}