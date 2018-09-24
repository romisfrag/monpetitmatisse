import { Component, OnDestroy, OnInit } from '@angular/core';
import { PronoService } from '../../services/prono.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-prono',
  templateUrl: './liste-prono.component.html',
  styleUrls: ['./liste-prono.component.scss']
})
export class ListePronoComponent implements OnInit {


  constructor(public pronoService: PronoService, private router: Router) { }

  ngOnInit() {
  }

  onChangeProno(event) {
    this.pronoService.retirePronoDone();
  }

}
