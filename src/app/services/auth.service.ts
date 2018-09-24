import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userPath = '/users';
  userList: Users[];

  constructor() { }

  createNewUser(email: string, mdp: string, pseudo: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, mdp).then(
          () => {
            resolve();
            this.registerUserName(pseudo);
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, mdp: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, mdp).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  getUser() {
    if (firebase.auth().currentUser !== null) {
      return firebase.auth().currentUser.uid;
    } else {
      throw Observable.throw('erreur de recuperation de l utilisateur');
    }
  }

  initUserList() {
    firebase.database().ref(this.userPath).on('value', snap => {
      this.userList = snap.val();
    });
  }

  registerUserName(name: string) {
      const newUser = new Users();
      newUser.id = this.getUser();
      newUser.name = name;
      this.userList.push(newUser);
      firebase.database().ref(this.userPath).set(this.userList);
  }

}
