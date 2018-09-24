import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  // On a besoin de cette variable pour stocker le formulaire de connexion
  signupForm: FormGroup;
  errorMessage: string;
  // Ici on à besoin du service d'auth plus du router ainsi que du formBuilder pour crée un formulaire
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  // Méthode permettant la creation d'un formulaire
  initForm() {
    this.signupForm = this.formBuilder.group({
      pseudo: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmitForm() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const pseudo = this.signupForm.get('pseudo').value;


    this.authService.createNewUser(email, password, pseudo).then(
      () => {
        this.router.navigate(['/prono/listeProno']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
