import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Result } from 'src/app/models/result';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss']
})
export class ResultListComponent implements OnInit{
  searchQueryResults$!: Observable<Result[] | null>;
  loading$!: Observable<boolean>;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.searchQueryResults$ = this.apiService.searchQueryResults$;
    this.loading$ = this.apiService.searchFormSubmitLoading$;
    }
}
