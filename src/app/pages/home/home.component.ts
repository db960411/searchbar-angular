import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, distinctUntilChanged, switchMap, takeUntil } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  private destroy$ = new Subject<void>();
  error: boolean = false;
  submitted$: Observable<boolean> = new Observable<boolean>();
  searchQuery$: Observable<string> = new Observable<string>();

  constructor(private apiService: ApiService) {
    this.searchForm = new FormGroup({
      searchQuery: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.updateSearchQueryOnInit();
    this.autoCompleteOnTyping();
    this.submitted$ = this.apiService.searchFormSubmitted$;
  }

  updateSearchQueryOnInit(): void {
    this.apiService.searchQueryString$
    .pipe(takeUntil(this.destroy$))
    .subscribe((searchQueryString: string) => {
      const searchQueryControl = this.searchForm?.get('searchQuery') as FormControl;
      if (searchQueryControl) {
        searchQueryControl.setValue(searchQueryString);
      }
    })
  }

  autoCompleteOnTyping(): void {
    this.searchForm.get('searchQuery')?.valueChanges
      .pipe(
        distinctUntilChanged(),
        switchMap(query => this.apiService.getAutoCompleteResults(query.trim())),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.apiService.searchFormSubmitted$.next(false);
      });
  }

  onSubmit(searchQuery: string): void {
    if (!this.searchForm.valid  || !searchQuery) {
      return;
    }
    
    this.apiService.getSearchQueryResults(searchQuery).subscribe({
      error: (err) => {
        console.error("Error submitting search query:", err);
        this.error = true;
      },
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
