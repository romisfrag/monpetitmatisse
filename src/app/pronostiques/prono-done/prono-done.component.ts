import { Component, OnInit, Input } from '@angular/core';
import { Prono } from 'src/app/models/prono.model';
import { Proposition } from '../../models/proposition.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-prono-done',
  templateUrl: './prono-done.component.html',
  styleUrls: ['./prono-done.component.scss']
})
export class PronoDoneComponent implements OnInit {

  @Input()
  prono: Prono;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  isThisTheAnswerDone(proposition: Proposition) {
    const id = this.authService.getUser();
    for (const vot of proposition.voteurs) {
      if (id === vot) {
        return true;
      }
    }
  }

}
