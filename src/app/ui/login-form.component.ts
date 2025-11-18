import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  template: `
    <div class="login-container">
      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Username</mat-label>
        <input matInput [(ngModel)]="username" />
      </mat-form-field>

      <mat-form-field appearance="outline" class="w-full">
        <mat-label>Password</mat-label>
        <input matInput type="password" [(ngModel)]="password" />
      </mat-form-field>

      <button mat-raised-button color="primary" (click)="submit()">
        Login
      </button>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 280px;
    }
  `]
})
export class LoginFormComponent {
  username = '';
  password = '';

  @Output() login = new EventEmitter<{ username: string; password: string }>();

  submit() {
    if (!this.username || !this.password) return;
    this.login.emit({ username: this.username, password: this.password });
  }
}
