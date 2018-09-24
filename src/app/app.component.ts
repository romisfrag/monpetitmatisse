import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mon-petit-matisse-real';
  constructor(private authService: AuthService) {
    const configFirebase = {
      apiKey: 'AIzaSyCwNFtYrQR74MTusAsJ_DT46YxgC1Pfs-g',
      authDomain: 'mon-petit-matisse.firebaseapp.com',
      databaseURL: 'https://mon-petit-matisse.firebaseio.com',
      projectId: 'mon-petit-matisse',
      storageBucket: 'mon-petit-matisse.appspot.com',
      messagingSenderId: '125487650998'
    };
    // initialisation de firebase
    firebase.initializeApp(configFirebase);
    // recuperation de la liste des utilisateurs
    this.authService.initUserList();
  }
}

