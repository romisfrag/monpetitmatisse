import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  // On a besoin de cette variable pour stocker le formulaire de connexion
  signInForm: FormGroup;
  errorMessage: string;

  constructor(private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }


  initForm() {
    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmitForm() {
    const mail = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.authService.signInUser(mail, password).then(
      // ça c'est le premier argument de la callback il y a toujours le premier c'est succes le second erreur
      () => {
        this.router.navigate(['/prono/listeProno']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
