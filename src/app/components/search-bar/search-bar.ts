import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.css']
})
export class SearchBarComponent implements OnDestroy {
  @Output() search = new EventEmitter<string>();
  searchQuery: string = '';
  
  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  constructor() {
     
    this.searchSubject.pipe(
      debounceTime(300), 
      distinctUntilChanged(), 
      takeUntil(this.destroy$)
    ).subscribe(query => {
      this.search.emit(query);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(): void {
    // Búsqueda inmediata al hacer clic en el botón
    this.search.emit(this.searchQuery);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      // Búsqueda inmediata al presionar Enter
      this.search.emit(this.searchQuery);
    }
  }

  onInputChange(): void {
   
    this.searchSubject.next(this.searchQuery);
  }
}