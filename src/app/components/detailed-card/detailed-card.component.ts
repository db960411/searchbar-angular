import { Component, Input } from '@angular/core';
import { Result } from 'src/app/models/result';

@Component({
  selector: 'app-detailed-card',
  templateUrl: './detailed-card.component.html',
  styleUrls: ['./detailed-card.component.scss']
})
export class DetailedCardComponent{
  @Input() cardData!: Result;
}
