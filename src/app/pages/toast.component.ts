import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../services/toast.service'

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast" *ngIf="toast$ | async as toast" [class]="toast.type">
      {{ toast.message }}
    </div>
  `,
  styles: [`
    .toast {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 14px 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      box-shadow: 0 6px 14px rgba(0,0,0,0.25);
      z-index: 9999;
      animation: fadeInOut 0.3s ease;
    }

    .success { background: #2ecc71; }
    .info    { background: #3498db; }
    .error   { background: #e74c3c; }

    @keyframes fadeInOut {
      from { transform: translateY(-10px); opacity: 0; }
      to   { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  toast$;

  constructor(private toastService: ToastService) {
    this.toast$ = this.toastService.toast$;
  }
}
