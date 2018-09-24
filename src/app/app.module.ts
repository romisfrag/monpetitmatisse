import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './login/signup/signup.component';
import { SigninComponent } from './login/signin/signin.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes , RouterModule} from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ListePronoComponent } from './pronostiques/liste-prono/liste-prono.component';
import { PronoComponent } from './pronostiques/prono/prono.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PronoService } from './services/prono.service';
import { PropositionComponent } from './pronostiques/proposition/proposition.component';
import { ListePronoDoneComponent } from './pronostiques/liste-prono-done/liste-prono-done.component';
import { PronoDoneComponent } from './pronostiques/prono-done/prono-done.component';




// Declaration des routes
const appRoutes: Routes = [
  // Les composants non protégés
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'accueil', component: AccueilComponent },
  // Les composant protégées
  { path: 'prono/listeProno', canActivate: [AuthGuardService], component: ListePronoComponent },
  { path: 'prono/listePronoDone', canActivate: [AuthGuardService], component: ListePronoDoneComponent },
  // Pour toutes les erreurs d'url rediriger vers l'accueil
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  { path: '**', redirectTo: 'accueil' }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    ListePronoComponent,
    PronoComponent,
    AccueilComponent,
    PropositionComponent,
    ListePronoDoneComponent,
    PronoDoneComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardService , AuthService , PronoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
