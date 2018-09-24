import { Component, OnInit, Input } from '@angular/core';
import { Proposition } from '../../models/proposition.model';

@Component({
  selector: 'app-proposition',
  templateUrl: './proposition.component.html',
  styleUrls: ['./proposition.component.scss']
})
export class PropositionComponent implements OnInit {

  @Input()
  proposition: Proposition;

  constructor() { }

  ngOnInit() {
  }

}
