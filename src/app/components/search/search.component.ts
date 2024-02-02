import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']})
  export class SearchComponent {
  @Input() searchForm!: FormGroup;
  @Output() searchQueryChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() error!: boolean;
  @Input() submitted!: boolean;

  constructor() {}

  onSubmit(): void {
    const searchQueryValue = this.searchForm?.get('searchQuery')?.value;
  
    if (!searchQueryValue || !this.searchForm.valid) {
      return;
    }

    this.searchQueryChange.emit(searchQueryValue);
  }

}
