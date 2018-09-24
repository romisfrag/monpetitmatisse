import { Injectable } from '@angular/core';
import { Prono } from '../models/prono.model';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class PronoService {

  backupList: Prono[] = [];
  pronos: Prono[] = [];
  pronosDone: Prono[] = [];
  pronoPath = '/pronos';

  // Retourne la liste de l'ensemble des pronostiques
  getPronoList() {
    this.getPronoFromDataBase();
  }


  // La methode marche bien elle recupere l'ensemble des informations contenues dans 'pronos'
  getPronoFromDataBase() {
    // Pour obtenir une reference vers la bdd
    const dbPronoRef = firebase.database().ref().child('pronos');
    /* Cette fonction permet à partir de la reference utilisée de récuperer les informations de la dataBase lorsqu'un event est
    trigger
    Premier parametre permet de dire sur quel type d'évenements on souhaite mettre à jour (value pour le changement de valeur)
    le second c'est la fonction de callBack appelé à chaque triger de l'event */
    dbPronoRef.on('value', snap => {
      this.pronos = snap.val();
      this.retirePronoDone();
      this.backupList = snap.val();
    });
  }

  // Permet de retirer les pronos deja faits par l'utilisateur et de les inserer dans la nouvelle liste
  retirePronoDone() {
    const user = this.authService.getUser();
    let i = 0;
    for (const p of this.pronos) {
      for (const prop of p.propositions) {
        for (const vot of prop.voteurs) {
          if (user === vot) {
            this.pronosDone.push(p);
            this.deletePronoIndex(i);
            return;
          }
        }
      }
      i++;
    }
  }

  // retire le prono d'indice i de la liste
  deletePronoIndex(i: number) {
    this.pronos.splice(i, 1);
  }

  // permet de mettre à jour la liste de backup
  backupListUpdate(p: Prono) {
    const id = p.id;
    this.backupList[id] = p;
  }

  // met à jour la liste des pronos sur la base de données
  uploadPronoDataBase(p: Prono) {
    const dbPronoRef = firebase.database().ref().child('pronos');
    this.backupListUpdate(p);
    dbPronoRef.set(this.backupList);
  }


  // Fonctions permettant de savoir si l'utilisateur à déja parier

  constructor (private authService: AuthService) {
    this.getPronoList();
  }
}
