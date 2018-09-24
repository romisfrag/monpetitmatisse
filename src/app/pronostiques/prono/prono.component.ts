import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Prono } from '../../models/prono.model';
import { PronoService } from '../../services/prono.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-prono',
  templateUrl: './prono.component.html',
  styleUrls: ['./prono.component.scss']
})
export class PronoComponent implements OnInit {

  // Permet lors de la construction du composant de lui passer
  @Input()
  prono: Prono;

  @Output()
  changeProno: EventEmitter<string> = new EventEmitter<string>();

  choix: number;

  constructor(private authService: AuthService, private pronoService: PronoService) { }

  ngOnInit() {
  }

  onSelectRadio(i: number) {
    this.choix = i;
  }

  submitProno() {
    this.prono.propositions[this.choix].voteurs.push(this.authService.getUser());
    this.pronoService.uploadPronoDataBase(this.prono);
    this.changeProno.emit('updateListe');
  }
}
