import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="bg-white border-b border-gray-200 px-4 sm:px-6 h-16 flex items-center justify-between">
      <a routerLink="/workspaces" class="flex items-center gap-2">
        <div class="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
          <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <span class="font-semibold text-gray-900">TaskFlow Pro</span>
      </a>
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-600 hidden sm:block">{{ user()?.firstName }} {{ user()?.lastName }}</span>
        <button (click)="logout()" class="btn-secondary text-xs px-3 py-1.5">Salir</button>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  user = this.auth.currentUser;
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout(); }
}
