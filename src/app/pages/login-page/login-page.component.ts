import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import * as AuthActions from '../../state/auth/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../state/auth/auth.selectors';
import { Observable } from 'rxjs';
import { LoginFormComponent } from '../../ui/login-form.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatFormFieldModule, MatInputModule, LoginFormComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css',

})
export class LoginPageComponent {

  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.loading$ = this.store.select(selectAuthLoading);
    this.error$ = this.store.select(selectAuthError);
  }

  submit(event: { username: string; password: string }) {
    this.store.dispatch(AuthActions.login(event));
  }
}
