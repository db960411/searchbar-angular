import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Result } from '../models/result';
import { BehaviorSubject, Observable, catchError, delay, map, of, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  autoCompleteUrl = 'https://api.openbrewerydb.org/v1/breweries/autocomplete?query=';
  searchQueryUrl = 'https://api.openbrewerydb.org/v1/breweries/search?query=';
  byIdsUrl = 'https://api.openbrewerydb.org/v1/breweries?by_ids=';
  bySingleIdUrl = 'https://api.openbrewerydb.org/v1/breweries/';

  autoCompleteResult$: BehaviorSubject<Result[] | null> = new BehaviorSubject<Result[] | null>(null);
  autoCompleteLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchQueryResults$: BehaviorSubject<Result[] | null> = new BehaviorSubject<Result[] | null>(null);
  searchFormSubmitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchFormSubmitLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchQueryString$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  singleBreweryResult$: BehaviorSubject<Result | null> = new BehaviorSubject<Result | null>(null);
  singleBreweryLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  getAutoCompleteResults(query: string): Observable<Result[]> {
    this.autoCompleteLoading$.next(true)
    return this.http.get<Result[]>(`${this.autoCompleteUrl}${query}`).pipe(
      map(results => results.splice(0, 4)),
      switchMap(results => {   
        const breweryIds = results.map(result => result.id);
        return this.getBreweryDetailsById(breweryIds);
      }),
      tap(detailedResults => this.autoCompleteResult$.next(detailedResults)),
      delay(50),
      tap(() => this.autoCompleteLoading$.next(false)),
      tap(() => this.searchQueryString$.next(query)),
      catchError((error: unknown) => {
        console.log("Error fetching auto complete results: ", error);
        this.autoCompleteLoading$.next(false)
        return [];
      }),
    );
  }

  getBreweryDetailsById(ids: string[]): Observable<Result[]> {
    const idsString = ids.join(",");
    return idsString ?
       this.http.get<Result[]>(`${this.byIdsUrl}${idsString}`).pipe(
        catchError((error: unknown) => {
          console.log("Error fetching brewery details for IDs: ", idsString, error);
          return [];
        }),
      ) : of([]);
  }

  getSearchQueryResults(query: string): Observable<Result[]> {
    this.searchFormSubmitLoading$.next(true)
    return this.http.get<Result[]>(`${this.searchQueryUrl}${query}`).pipe(
      catchError((error: unknown) => {
        console.log("Error fetching brewery details during search submit", error);
        return [];
      }),
      tap(() => this.searchFormSubmitted$.next(true)),
      tap(() => this.searchQueryString$.next(query)),
      delay(50),
      tap(() => this.searchFormSubmitLoading$.next(false)),
      tap(result => this.searchQueryResults$.next(result),
      )
    )
  }

  getDataForSingleBrewery(breweryId: string): Observable<Result> {
    this.singleBreweryLoading$.next(true);
    return this.http.get<Result>(`${this.bySingleIdUrl}${breweryId}`).pipe(
      tap(result => this.singleBreweryResult$.next(result)),
      tap(() => this.singleBreweryLoading$.next(false)),
      catchError((error: unknown) => {
        console.log("Error fetching brewery details by for single brewery", error);
        return [];
      })
    )
  }

}
