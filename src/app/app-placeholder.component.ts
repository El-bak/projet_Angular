import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { Observable } from 'rxjs';

import { AppState } from './state/app.state';
import { selectAccessToken } from './state/auth/auth.selectors';

@Component({
  standalone: true,
  selector: 'app-placeholder',
  imports: [CommonModule, MatButtonModule, MatChipsModule],
  template: `
   <div class="page-container">
    <section class="content-card mx-auto max-w-3xl px-4 py-10 space-y-4">
      <h2 class="text-2xl font-semibold">App Shop — Placeholder</h2>
      <p class="text-gray-600">Ici viendra l’UI cohérente (login, liste produits, avis...).</p>

      <div class="flex gap-3">
        <button mat-raised-button color="primary" (click)="go('/app/login')">
          Login
        </button>

      </div>

      <div class="mt-4">
        <mat-chip color="primary" selected *ngIf="token$ | async as t">Connected</mat-chip>
        <mat-chip color="warn" selected *ngIf="!(token$ | async)">Not Connected</mat-chip>
      </div>
    </section>
   </div>
  `,
})
export class AppPlaceholderComponent {
  token$!: Observable<string | null>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.token$ = this.store.select(selectAccessToken);
  }

  go(path: string) {
    this.router.navigate([path]);
  }

}
