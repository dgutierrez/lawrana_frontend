import { NgFor, NgIf } from '@angular/common';
import { Component, signal, Input, computed } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { Router, RouterModule } from '@angular/router';

export type MenuItem = {
  icon: string;
  label: string;
  route: string;
}

@Component({
  selector: 'app-meu-sidenav',
  standalone: true,
  imports: [MatListModule, MatIconModule, NgFor, NgIf, RouterModule],
  templateUrl: './meu-sidenav.component.html',
  styleUrl: './meu-sidenav.component.css'
})
export class MeuSidenavComponent {
  sideNavCollapsed = signal(false);
  @Input() set collapsed(val: boolean){
    this.sideNavCollapsed.set(val)
  }

  @Input() menuItems = signal<MenuItem[]>([
    {
      icon: 'dashboard',
      label: 'Dashboard',
      route: 'dasboard'
    },
    {
      icon: 'people',
      label: 'Assistentes',
      route: 'assistentes'
    },
  ])

  profilePicSize = computed(() => this.sideNavCollapsed() ? '32' : '100');
}
