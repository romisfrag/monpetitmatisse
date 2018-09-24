import { Component, OnInit } from '@angular/core';
import { PronoService } from '../../services/prono.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-liste-prono-done',
  templateUrl: './liste-prono-done.component.html',
  styleUrls: ['./liste-prono-done.component.scss']
})
export class ListePronoDoneComponent implements OnInit {

  constructor(public pronoService: PronoService, private router: Router) { }

  ngOnInit() {
  }

}
