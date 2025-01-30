import {Component, computed, Input, signal} from '@angular/core';
import {MatIcon} from '@angular/material/icon';
import {MatListItem, MatListItemIcon, MatNavList} from '@angular/material/list';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidnav-conteudo',
  imports: [
    MatIcon,
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive,MatListItemIcon
  ],
  templateUrl: './sidnav-conteudo.component.html',
  standalone: true,
  styleUrl: './sidnav-conteudo.component.css'
})
export class SidnavConteudoComponent {
  sidenavCollapsed = signal(false)
  @Input() set collapsed(value: boolean) {
    this.sidenavCollapsed.set(value)
  }

  profilePicSize = computed(()=> this.sidenavCollapsed() ? '35' : '100')
}
