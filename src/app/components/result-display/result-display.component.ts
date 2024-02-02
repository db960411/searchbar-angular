import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/result';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.scss']
})
export class ResultDisplayComponent implements OnInit{
  searchResults$!: Observable<Result[] | null>;
  loading$!: Observable<boolean>;

  constructor(private apiService: ApiService){}

  ngOnInit(): void {
    this.searchResults$ = this.apiService.autoCompleteResult$;
    this.loading$ = this.apiService.autoCompleteLoading$;
  }

}
