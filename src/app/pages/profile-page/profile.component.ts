import { Component, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { toSignal } from '@angular/core/rxjs-interop';

import * as UserActions from '../../state/user/user.actions';
import {
  selectUserProfile,
  selectUserLoading,
  selectUserOrders
} from '../../state/user/user.selectors';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private store = inject(Store);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  profile$ = this.store.select(selectUserProfile);
  profileSignal = toSignal(this.profile$);

  orders$ = this.store.select(selectUserOrders);
  loading$ = this.store.select(selectUserLoading);

  form = this.fb.group({
    newsletter: [false],
    defaultMinRating: [1]
  });

  constructor() {
    effect(() => {
      const profile = this.profileSignal();
      if (!profile) return;

      this.form.patchValue({
        newsletter: profile.preferences.newsletter,
        defaultMinRating: profile.preferences.defaultMinRating
      });
    });
  }

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUserProfile());
    this.store.dispatch(UserActions.loadUserOrders());
  }

  save(): void {
    if (this.form.invalid) return;

    this.store.dispatch(
      UserActions.updateUserProfile({
        changes: {
          preferences: this.form.value
        }
      })
    );

    this.snackBar.open(
      'Profil mis à jour avec succès',
      'OK',
      { duration: 3000 }
    );
  }
}
