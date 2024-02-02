import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, delay, takeUntil } from 'rxjs';
import { Result } from 'src/app/models/result';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details-view',
  templateUrl: './details-view.component.html',
  styleUrls: ['./details-view.component.scss']
})
export class DetailsViewComponent implements OnInit, OnDestroy{
  detailsData$!: Observable<Result | null>;
  itemId!: string;
  loading$!: Observable<boolean>;
  error!: boolean;
  private destroy$ = new Subject<void>();

  constructor(private apiService: ApiService, private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.loading$ = this.apiService.singleBreweryLoading$;
    this.detailsData$ = this.apiService.singleBreweryResult$;

      this.route.paramMap.subscribe((params: any) => {
        this.itemId = params.get('id');  

        this.apiService.getDataForSingleBrewery(this.itemId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          error: () => {
            this.error = true;
          }
        });
      })
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

    goBack(): void {
        this.location.back();
        this.apiService.singleBreweryResult$.next(null);
    }
}
