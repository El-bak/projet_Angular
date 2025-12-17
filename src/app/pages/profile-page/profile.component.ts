import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import * as UserActions from '../../state/user/user.actions';
import {
  selectUserProfile,
  selectUserLoading
} from '../../state/user/user.selectors';

import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { selectUserOrders } from '../../state/user/user.selectors';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatListModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
  
})
export class ProfileComponent implements OnInit {

  private store = inject(Store);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  orders$ = this.store.select(selectUserOrders);

  profile$ = this.store.select(selectUserProfile);
  loading$ = this.store.select(selectUserLoading);
  
  form = this.fb.group({
    newsletter: [false],
    defaultMinRating: [1]
  });

  ngOnInit(): void {
    this.store.dispatch(UserActions.loadUserProfile());
    this.store.dispatch(UserActions.loadUserOrders());


    this.profile$.subscribe(profile => {
      if (!profile) return;

      this.form.patchValue({
        newsletter: profile.preferences.newsletter,
        defaultMinRating: profile.preferences.defaultMinRating
      });
    });
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



  


